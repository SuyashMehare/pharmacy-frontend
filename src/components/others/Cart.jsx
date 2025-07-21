import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity, toggleConsideration } from "../../redux/slices/CartSlice";
import { Minus, Plus, ShoppingCart, Check, X } from "lucide-react";

export default function Cart({callProccedCheckout}) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleToggleConsideration = (productId) => {
    dispatch(toggleConsideration({ productId }));
  };

  const calculateTotal = () => {
    return cart.data.items.reduce((total, item) => {
      return item.inConsideration ? total + (item.productPrice * item.productQuantity) : total;
    }, 0);
  };

  return (
    <div className="container mt-5 rounded-md mx-auto px-4 py-8 bg-gray-900 max-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white">Your Shopping Cart</h1>
      
      {cart.data.items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-600 mb-4" />
          <p className="text-gray-400">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {cart.data.items.map((item) => (
                  <tr 
                    key={item.productId} 
                    className={!item.inConsideration ? "opacity-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ₹{item.productPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.productQuantity - 1)}
                          className="p-1 rounded-md border border-gray-600 hover:bg-gray-700 text-gray-300"
                          disabled={item.productQuantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-white">{item.productQuantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.productId, item.productQuantity + 1)}
                          className="p-1 rounded-md border border-gray-600 hover:bg-gray-700 text-gray-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ₹{item.productPrice * item.productQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        onClick={() => handleToggleConsideration(item.productId)}
                        className={`p-2 rounded-full ${item.inConsideration ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}
                        title={item.inConsideration ? "Remove from consideration" : "Add to consideration"}
                      >
                        {item.inConsideration ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm w-full max-w-md border border-gray-700">
              <h2 className="text-lg font-medium text-white mb-4">Order Summary</h2>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Shipping</span>
                <span className="text-white">Free</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-lg font-medium text-white">Total</span>
                <span className="text-lg font-bold text-white">₹{calculateTotal()}</span>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={calculateTotal() === 0}
                onClick={callProccedCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}