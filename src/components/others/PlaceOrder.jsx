import { useState } from 'react';

const PlaceOrderComponent = ({executePayment}) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', isSuccess: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      showNotification('Please enter a valid bank account number', false);
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      const isSuccess = await executePayment(accountNumber);
    
      if (isSuccess) {
        showNotification('Transaction completed successfully!', true);
        setAccountNumber('');
      } else {
        showNotification('Transaction failed. Please try again.', false);
      }
    } catch (error) {
      showNotification('An error occurred. Please try again later.', false);
    } finally {
      setIsProcessing(false);
    }
  };

  const showNotification = (message, isSuccess) => {
    setNotification({ show: true, message, isSuccess });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="accountNumber" className="block text-sm font-medium mb-2">
                Bank Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your account number"
              />
            </div>
            
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-lg font-medium transition ${isProcessing 
                ? 'bg-blue-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-500'}`}
            >
              {isProcessing ? 'Processing...' : 'Execute Transaction'}
            </button>
          </form>
        </div>
        
        {/* Notification Toast */}
        {notification.show && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 ${notification.isSuccess ? 'bg-green-700' : 'bg-red-700'}`}>
            <div className="flex items-center">
              <div className="mr-3">
                {notification.isSuccess ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="text-sm">
                {notification.message}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrderComponent;