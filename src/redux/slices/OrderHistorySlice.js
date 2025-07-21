import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../../constants/backend_urls";
import { getToken } from "../../utils/localStorage";

// const { createSlice } = require("@reduxjs/toolkit");
export const fetchUserOrderHistory = createAsyncThunk('OrderHistory/fetchUserOrderHistory', async() => {
    console.log('url',ENDPOINTS.order.user.getOrderHistory, null);
    
    const res = await axios.get(ENDPOINTS.order.user.getOrderHistory, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    return res.data.data
})


const OrderHistorySlice = createSlice({
    name: 'OrderHistory',
    initialState: {
        loading: false,
        error: false,
        message: '',
        data: []
    },
    reducers: {
        setAlldata(state, action) {
            console.log(action.payload);
            
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserOrderHistory.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
            console.log('fulfill order history payload',action.payload);
            
            state.data = action.payload
            state.loading = false
        })
        .addCase(fetchUserOrderHistory.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.error.message;
        })

    }
});

export const {} = OrderHistorySlice.actions;
export default OrderHistorySlice.reducer;