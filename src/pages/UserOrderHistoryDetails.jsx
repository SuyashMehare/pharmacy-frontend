import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserOrderHistory } from "../redux/slices/OrderHistorySlice";

const statusConfig = {
  not_initiated: {
    label: "Not Initiated",
    color: "bg-gray-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  initiated: {
    label: "Initiated",
    color: "bg-blue-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  aborted: {
    label: "Aborted",
    color: "bg-red-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  shipped: {
    label: "Shipped",
    color: "bg-purple-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function UserOrderHistoryDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message, data } = useSelector((state) => state.orderHistory);
  const order = data.length > 0 ? data[0] : null;

  console.log(loading, error, message, data);
  
  useEffect(() => {
    dispatch(fetchUserOrderHistory(orderId));
  }, [dispatch, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-gray-700 py-4 last:border-0">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-700 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-700 rounded w-1/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="max-w-md bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Order</h3>
          <p className="text-gray-300 mb-4">{message || "Failed to load order details"}</p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition"
            >
              Go Back
            </button>
            <button
              onClick={() => dispatch(fetchUserOrderHistory(orderId))}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {    
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="max-w-md bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Order Not Found</h3>
          <p className="text-gray-300 mb-4">The requested order could not be found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-800 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">Order Details</h1>
        </div>

        {/* Order Summary Card */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Order #{order.orderId}</h2>
              <p className="text-gray-400 text-sm">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <span className={`${statusConfig[order.orderStatus].color} text-white text-sm font-semibold px-3 py-1 rounded-full inline-flex items-center`}>
                {statusConfig[order.orderStatus].icon}
                <span className="ml-1">{statusConfig[order.orderStatus].label}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="text-gray-400 font-medium mb-1">Payment Method</h3>
              <p className="text-white">Credit Card ending in ••••4242</p>
            </div>
            <div>
              <h3 className="text-gray-400 font-medium mb-1">Shipping Address</h3>
              <p className="text-white">123 Main St, Apt 4B</p>
              <p className="text-white">New York, NY 10001</p>
            </div>
          </div>
        </div>

        {/* Order Items Card */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Order Items</h2>
          
          <div className="divide-y divide-gray-700">
            {order.items.map((item) => (
              <div key={item.itemId} className="py-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium text-white">
                    {item.productName} <span className="text-gray-400">× {item.quantity}</span>
                  </div>
                  <div className="text-white">{formatCurrency(item.totalItemAmount)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <div>SKU: {item.productId}</div>
                  <div>{formatCurrency(item.productPrice)} each</div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">{formatCurrency(order.totalOrderAmount)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Shipping</span>
              <span className="text-white">{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between mt-4 pt-2 border-t border-gray-700">
              <span className="font-semibold text-white">Total</span>
              <span className="font-bold text-white">{formatCurrency(order.totalOrderAmount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          {order.orderStatus === 'initiated' && (
            <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium transition">
              Cancel Order
            </button>
          )}
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition"
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
}