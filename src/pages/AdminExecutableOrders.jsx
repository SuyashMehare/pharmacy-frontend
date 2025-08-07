// import { ClipboardList, Truck } from "lucide-react";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { store } from "../redux/store";
// import { fetchExecutableOrders } from "../redux/adminSlices/userExecutableOrders";

// export function AdminExecutableOrders() {
//     const { loading, error, message, data }= useSelector(state => state.executableOrders)
//     const { initiatedOrders, shippedOrders, orders } = data;

//     useEffect(() => {
//         store.dispatch(fetchExecutableOrders());        
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-900 p-6">
//                 <div className="max-w-6xl mx-auto">
//                     <h1 className="text-2xl font-bold text-white mb-6">Order History</h1>
//                     <div className="grid gap-6">
//                         {[...Array(4)].map((_, i) => (
//                             <div key={i} className="bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
//                                 <div className="flex justify-between mb-4">
//                                     <div className="h-6 bg-gray-700 rounded w-1/4"></div>
//                                     <div className="h-6 bg-gray-700 rounded w-1/6"></div>
//                                 </div>
//                                 <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
//                                 <div className="h-10 bg-gray-700 rounded w-1/3"></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//             return (
//                 <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
//                     <div className="max-w-md bg-gray-800 rounded-lg shadow-lg p-6 text-center">
//                         <div className="text-red-500 mb-4">
//                             <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <h3 className="text-xl font-bold text-white mb-2">Error Loading Orders</h3>
//                         <p className="text-gray-300 mb-4">{message || "Failed to load order history"}</p>
//                         <button
//                             onClick={() => dispatch(fetchUserOrderHistory())}
//                             className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition"
//                         >
//                             Retry
//                         </button>
//                     </div>
//                 </div>
//             );
//         }

//     return <>
//         <div>
//             <DarkMetricCard
//                 icon={ClipboardList}
//                 backgroundColor="bg-indigo-600"
//                 iconColor="text-indigo-200"
//                 label="Initiated Orders"
//                 value={count}
//             />
//             <DarkMetricCard
//                 icon={Truck}
//                 backgroundColor="bg-emerald-600"
//                 iconColor="text-emerald-200"
//                 label="Shipped Orders"
//                 value={count}
//             />
//         </div>

//     </>
// }
////


import { ClipboardList, Truck, ArrowUpDown, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { fetchExecutableOrders } from "../redux/adminSlices/userExecutableOrders";

export function AdminExecutableOrders() {
    const { loading, error, message, data } = useSelector(state => state.executableOrders);
    const { initiatedOrders, shippedOrders, orders = [] } = data;
    const [filter, setFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ 
        key: 'orderId', 
        direction: 'asc' 
    });

    useEffect(() => {
        store.dispatch(fetchExecutableOrders());        
    }, []);

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.status === filter;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const executeOrder = (orderId) => {
        // Implement order execution logic
        console.log('Executing order:', orderId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-white mb-6">Executable Orders</h1>
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
                    <p className="text-gray-300 mb-4">{message || "Failed to load orders"}</p>
                    <button
                        onClick={() => store.dispatch(fetchExecutableOrders())}
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
                <h1 className="text-2xl font-bold text-white mb-6">Order Management</h1>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-indigo-600 rounded-lg p-6 shadow-lg text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium opacity-80">Initiated Orders</p>
                                <h3 className="text-2xl font-bold mt-1">{initiatedOrders}</h3>
                            </div>
                            <div className="p-3 rounded-lg bg-black bg-opacity-20">
                                <ClipboardList className="h-6 w-6 text-indigo-200" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-emerald-600 rounded-lg p-6 shadow-lg text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium opacity-80">Shipped Orders</p>
                                <h3 className="text-2xl font-bold mt-1">{shippedOrders}</h3>
                            </div>
                            <div className="p-3 rounded-lg bg-black bg-opacity-20">
                                <Truck className="h-6 w-6 text-emerald-200" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="appearance-none bg-gray-800 border border-gray-700 rounded-md pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Orders</option>
                            <option value="initiated">Initiated Only</option>
                            <option value="shipped">Shipped Only</option>
                        </select>
                        <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400">
                        Showing {sortedOrders.length} of {orders.length} orders
                    </p>
                </div>

                {/* Orders Table */}
                <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('orderId')}
                                    >
                                        <div className="flex items-center">
                                            Order ID
                                            <ArrowUpDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        User ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th 
                                        scope="col" 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                                        onClick={() => requestSort('totalAmount')}
                                    >
                                        <div className="flex items-center">
                                            Amount
                                            <ArrowUpDown className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {sortedOrders.length > 0 ? (
                                    sortedOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-750">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                #{order._id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {order.userId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    order.status === 'initiated' 
                                                        ? 'bg-indigo-100 text-indigo-800' 
                                                        : 'bg-emerald-100 text-emerald-800'
                                                }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                ${parseFloat(order.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => executeOrder(order.orderId)}
                                                    className="text-blue-500 hover:text-blue-400 transition-colors"
                                                    disabled={order.status === 'shipped'}
                                                >
                                                    {order.status === 'initiated' ? 'Mark as Shipped' : 'Completed'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-400">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}