import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import orderHistoryReducer from "./slices/OrderHistorySlice";
import executableOrdersReducer from "./adminSlices/userExecutableOrders";

const rootReducer = combineReducers({
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    executableOrders: executableOrdersReducer
})

export const store = configureStore({
    reducer: rootReducer
})