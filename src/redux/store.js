import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import orderHistoryReducer from "./slices/OrderHistorySlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    orderHistory: orderHistoryReducer
})

export const store = configureStore({
    reducer: rootReducer
})