import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartProducts: []
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartProducts.find(x => x.product.id === item.product.id)
            if (existItem) {
                return {
                    ...state,
                    cartProducts: state.cartProducts.map(x => x.product.id === existItem.product.id ? item : x)
                }
            }
            else {
                return {
                    ...state,
                    cartProducts: [...state.cartProducts, item]
                }
            }
        },
        delItemToCart: (state, action) => {
            return {
                ...state,
                cartProducts: state.cartProducts.filter(item => item.product.id !== action.payload)
            }
        },
        emptyCart: (state) => {
            state.cartProducts = []
        }
    }
})

export const { addCart, delItemToCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer