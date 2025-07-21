import { createSlice } from "@reduxjs/toolkit";
/**
 * data: {
 * items: [{
 *      productId,
 *      productName,
 *      productPrice,
 *      productQuantity,
 *      inConsideration: Boolean
 * }],
 * totalPay: sumOFAll(productPrice*productQuantity)
 * 
 */

const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        loading: false,
        error: false,
        message: '',
        data: {
            items: [],
            totalPay: 0
        }
    },
    reducers: {
        addToCart(state, action) {
            const { productId, productName, productPrice } = action.payload;
            console.log('payload', action.payload); 

            const item = {
                productId,
                productName,
                productPrice,
                productQuantity: 1,
                inConsideration: true
            }
            console.log('item', item);

            state.data.items.push(item);
            state.data.totalPay += productPrice;
        },
        updateQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const item = state.data.items.find(item => item.productId === productId);

            if (item) {
                item.productQuantity = quantity;
                state.data.totalPay = state.data.items.reduce((total, item) => {
                    return item.inConsideration ? total + (item.productPrice * item.productQuantity) : total;
                }, 0);
            }
        },
        toggleConsideration(state, action) {
            const { productId } = action.payload;
            const item = state.data.items.find(item => item.productId === productId);

            if (item) {
                item.inConsideration = !item.inConsideration;
                state.data.totalPay = state.data.items.reduce((total, item) => {
                    return item.inConsideration ? total + (item.productPrice * item.productQuantity) : total;
                }, 0);
            }
        }
    }
})

export const { addToCart, toggleConsideration, updateQuantity } = CartSlice.actions


export default CartSlice.reducer;