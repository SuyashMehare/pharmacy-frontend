import { useSelector } from "react-redux";
import { IndianRupee, CreditCard, Smartphone, Wallet } from "lucide-react";

export default function Checkout({callProccedPlaceOrder}) {
  const cart = useSelector(state => state.cart);
  
  // Calculate total only for items in consideration
  const calculateTotal = () => {
    return cart.data.items.reduce((total, item) => {
      return item.inConsideration ? total + (item.productPrice * item.productQuantity) : total;
    }, 0);
  };

  // Filter only items in consideration
  const consideredItems = cart.data.items.filter(item => item.inConsideration);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary Section */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">Order Summary</h2>
            
            {consideredItems.length === 0 ? (
              <p className="text-gray-400">No items selected for checkout</p>
            ) : (
              <div className="divide-y divide-gray-700">
                {consideredItems.map((item) => (
                  <div key={item.productId} className="py-4 flex justify-between">
                    <div>
                      <h3 className="text-md font-medium text-white">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {item.productQuantity} × ₹{item.productPrice}
                      </p>
                    </div>
                    <p className="text-md font-medium text-white">
                      ₹{item.productPrice * item.productQuantity}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Methods Section */}
          <div className="bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">Payment Methods</h2>
            
            <div className="space-y-4">
              {/* Razorpay Option */}
              <div className="flex items-center p-4 border border-gray-700 rounded-lg hover:border-blue-500 cursor-pointer bg-gray-750">
                <input 
                  type="radio" 
                  id="razorpay" 
                  name="payment" 
                  value="razorpay" 
                  className="h-4 w-4 text-blue-500 focus:ring-blue-600 border-gray-600"
                  defaultChecked
                />
                <label htmlFor="razorpay" className="ml-3 flex items-center">
                  <img 
                    src="https://razorpay.com/build/browser/static/razorpay-logo.8a0e6d6d.svg" 
                    alt="Razorpay" 
                    className="h-6 ml-2 filter brightness-0 invert"
                  />
                  <span className="ml-2 text-sm text-gray-300">Pay with UPI, Cards, Wallets & more</span>
                </label>
              </div>

              {/* Disabled Options */}
              <div className="flex items-center p-4 border border-gray-700 rounded-lg opacity-50 cursor-not-allowed bg-gray-800">
                <input 
                  type="radio" 
                  id="card" 
                  name="payment" 
                  value="card" 
                  disabled
                  className="h-4 w-4 text-blue-500 border-gray-600"
                />
                <label htmlFor="card" className="ml-3 flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span className="ml-2 text-sm text-gray-500">Credit/Debit Card</span>
                </label>
              </div>

              <div className="flex items-center p-4 border border-gray-700 rounded-lg opacity-50 cursor-not-allowed bg-gray-800">
                <input 
                  type="radio" 
                  id="wallet" 
                  name="payment" 
                  value="wallet" 
                  disabled
                  className="h-4 w-4 text-blue-500 border-gray-600"
                />
                <label htmlFor="wallet" className="ml-3 flex items-center">
                  <Wallet className="h-5 w-5 text-gray-500" />
                  <span className="ml-2 text-sm text-gray-500">Wallet</span>
                </label>
              </div>

              <div className="flex items-center p-4 border border-gray-700 rounded-lg opacity-50 cursor-not-allowed bg-gray-800">
                <input 
                  type="radio" 
                  id="upi" 
                  name="payment" 
                  value="upi" 
                  disabled
                  className="h-4 w-4 text-blue-500 border-gray-600"
                />
                <label htmlFor="upi" className="ml-3 flex items-center">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <span className="ml-2 text-sm text-gray-500">UPI</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Total Section */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">Order Total</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="text-white">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-700">
                <span className="font-medium text-white">Total</span>
                <span className="font-bold text-white">₹{calculateTotal()}</span>
              </div>
            </div>

            <button
              className={`w-full mt-6 py-3 px-4 rounded-md font-medium ${consideredItems.length > 0 ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              disabled={consideredItems.length === 0}
              onClick={callProccedPlaceOrder}
            >
              Place Order
            </button>

            <p className="mt-4 text-xs text-gray-500">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}