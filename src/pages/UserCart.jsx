import { useState } from "react";
import Cart from "../components/others/Cart";
import Checkout from "../components/others/Checkout";
import PlaceOrderComponent from "../components/others/PlaceOrder";
import axios from "axios";
import { ENDPOINTS } from "../constants/backend_urls";
import { useSelector } from "react-redux";
import { getToken } from "../utils/localStorage";

export default function() {
  const cart = useSelector(state => state.cart)
  const[proccedCheckout, setProccedCheckOut] = useState(false);
  const[proccedPlaceOrder, setProccedPlaceOrder] = useState(false);
  const[transitionId, setTransactionId] = useState(null);

  function callProccedCheckout() {
    setProccedCheckOut(true);
  }

  //[{productId, quantity}]
  async function callProccedPlaceOrder() {
    setProccedPlaceOrder(true);

    const data = cart.data.items?.map((item) => ({productId: item.productId, 
    quantity: item.productQuantity}));
   
    const body = {
      userOrders: data
    }
    const res = await axios.post(ENDPOINTS.order.user.createOrder, body, {
      headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
    
    console.log('response', res);
    
    setTransactionId(res.data.data.transactionId);
  }


  async function executePayment(accountNo) {
    const body = {
      txId: transitionId,
      from: accountNo
    }

    const res = await axios.patch(ENDPOINTS.order.user.sendOrderAmount, body);
    // console.log('res.data', res.data);
    
    return res.data.success;
  }
  return <>
    {!proccedCheckout &&  <Cart callProccedCheckout={callProccedCheckout}/> }
    {proccedCheckout && !proccedPlaceOrder && <Checkout callProccedPlaceOrder={callProccedPlaceOrder}/> }
    {proccedPlaceOrder && <PlaceOrderComponent executePayment={executePayment}/>}
  </>
}