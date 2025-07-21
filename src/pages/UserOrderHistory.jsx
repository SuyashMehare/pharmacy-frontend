// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { fetchUserOrderHistory } from "../redux/slices/OrderHistorySlice";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrderHistory } from "../redux/slices/OrderHistorySlice";

import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "../constants/frontend_urls";

const statusConfig = {
    not_initiated: {
        label: "Not Initiated",
        color: "bg-gray-500",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    initiated: {
        label: "Initiated",
        color: "bg-blue-500",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
    aborted: {
        label: "Aborted",
        color: "bg-red-500",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
    },
    shipped: {
        label: "Shipped",
        color: "bg-purple-500",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
        ),
    },
    delivered: {
        label: "Delivered",
        color: "bg-green-500",
        icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function UserOrderHistory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, message, data } = useSelector((state) => state.orderHistory);

    useEffect(() => {
        dispatch(fetchUserOrderHistory());
    }, [dispatch]);

    const handleViewDetails = (orderId) => {
        navigate('./' + orderId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-white mb-6">Order History</h1>
                    <div className="grid gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                                <div className="flex justify-between mb-4">
                                    <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                                    <div className="h-6 bg-gray-700 rounded w-1/6"></div>
                                </div>
                                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                                <div className="h-10 bg-gray-700 rounded w-1/3"></div>
                            </div>
                        ))}
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
                    <h3 className="text-xl font-bold text-white mb-2">Error Loading Orders</h3>
                    <p className="text-gray-300 mb-4">{message || "Failed to load order history"}</p>
                    <button
                        onClick={() => dispatch(fetchUserOrderHistory())}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-white mb-6">Order History</h1>

                {data.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No Orders Found</h3>
                        <p className="text-gray-400">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {data.map((order) => (
                            <div key={order.orderId} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div className="flex items-center mb-2 sm:mb-0">
                                            <span className="text-gray-400 mr-2">Order #</span>
                                            <span className="font-mono text-blue-400">{order.orderId}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`${statusConfig[order.orderStatus].color} text-white text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center`}>
                                                {statusConfig[order.orderStatus].icon}
                                                <span className="ml-1">{statusConfig[order.orderStatus].label}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-gray-300 mb-1">
                                            {order.items.length} item{order.items.length !== 1 ? "s" : ""} • {formatCurrency(order.totalOrderAmount)}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {order.items.slice(0, 2).map((item) => item.productName).join(", ")}
                                            {order.items.length > 2 && ` and ${order.items.length - 2} more`}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleViewDetails(order.orderId)}
                                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}