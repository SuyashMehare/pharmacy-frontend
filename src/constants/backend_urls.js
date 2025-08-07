export const PHARMACY_BACKEND = 'http://localhost:3000/api/v1'
export const RAZROPAY_BACKEND = 'http://localhost:5222'

export const ENDPOINTS = {
    auth: {
        admin: {
            signup: PHARMACY_BACKEND + '/auth/signup',
            login: PHARMACY_BACKEND + '/auth/login',
            forgotPassoword: PHARMACY_BACKEND + '/auth/forgot-password',
            resetPassoword: PHARMACY_BACKEND + '/auth/reset-password/', // :token needed
        },
        user: {
            signup: PHARMACY_BACKEND + '/auth/signup',
            login: PHARMACY_BACKEND + '/auth/login',
            forgotPassoword: PHARMACY_BACKEND + '/auth/forgot-password',
            resetPassoword: PHARMACY_BACKEND + '/auth/reset-password/', // :token needed
        }
    },

    product: {
        user: {
            getAllProducts: PHARMACY_BACKEND + '/users',
            getSingleProdcut: PHARMACY_BACKEND + '/users/single',
            subscribeProduct: PHARMACY_BACKEND + '/users/product/subscribe',
            unSubscribeProduct: PHARMACY_BACKEND + '/users/product/unsubscribe'
        },
        admin: {
            getAllProducts: PHARMACY_BACKEND + '/admin',
            createSingleProduct: PHARMACY_BACKEND + '/admin',
            createManyProducts: PHARMACY_BACKEND + '/admin/many',
            updateProduct: PHARMACY_BACKEND + '/admin', // :productId needed
            deleteProduct: PHARMACY_BACKEND + '/admin', // :productId needed
        }
    },

    order: {
        admin: {
            updateOrderStatus: PHARMACY_BACKEND + '/admin/order/status', // :orderId needed
            fetchExecutableOrders: PHARMACY_BACKEND + '/admin/orders'
        },
        user: {
            createOrder: PHARMACY_BACKEND + '/users/order',
            getOrderHistory: PHARMACY_BACKEND + '/users/order/history',
            sendOrderAmount: 'http://localhost:5222/rezorpay/sent'
        }

    },


}