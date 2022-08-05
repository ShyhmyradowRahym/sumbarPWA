import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    favProducts: [],
}

export const favSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        addFav: (state, action) => {
            const item = action.payload
            return {
                ...state,
                favProducts: [...state.favProducts, item]
            }
        },
        delItemToFav: (state, action) => {
            return {
                ...state,
                favProducts: state.favProducts.filter(item => item.id !== action.payload.id)
            }
        },
    }
})

export const { addFav, delItemToFav } = favSlice.actions
export default favSlice.reducer