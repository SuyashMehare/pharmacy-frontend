import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../../constants/backend_urls";
import { getToken } from "../../utils/localStorage";

export const fetchExecutableOrders = createAsyncThunk('ExecutableOrders', async () => {
    const res = await axios.get(ENDPOINTS.order.admin.fetchExecutableOrders, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    let initiatedOrders = 0, shippedOrders = 0, orders = [];
    console.log(res.data);
    
    if (res.data.success) {
           orders = res.data.data || []
        orders.forEach(val => {
            if (val.orderStatus == "initiated")
                initiatedOrders++;

            if (val.orderStatus == "shipped")
                shippedOrders++;
        })
    }

    console.log(initiatedOrders,
        shippedOrders);
    
    return {
        initiatedOrders,
        shippedOrders,
        orders
    }
})

const executeableOrdersSlice = createSlice({
    name: "ExecutableOrders",
    initialState: {
        loading: false,
        error: false,
        message: '',
        data: {
            initiatedOrders: 0,
            shippedOrders: 0,
            orders: []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchExecutableOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExecutableOrders.fulfilled, (state, data) => {
                state.loading = false;
                state.data.initiatedOrders = data.payload.initiatedOrders;
                state.data.shippedOrders = data.payload.shippedOrders;
                state.data.orders = data.payload.orders;

            })
            .addCase(fetchExecutableOrders.rejected, (state, data) => {
                state.loading = false;
                state.error = true;
                state.message = data.error.message;
            })
    }
})

export default executeableOrdersSlice.reducer;