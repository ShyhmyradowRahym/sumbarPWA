import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    equalProducts: [],
    show:true
}

export const equalSlice = createSlice({
    name: 'equal',
    initialState,
    reducers: {
        addEqual: (state, action) => {
            const item = action.payload
            return {
                ...state,
                equalProducts: [...state.equalProducts, item],
                show:true
            }
        },
        delItemToEqual: (state, action) => {
            return {
                ...state,
                equalProducts: state.equalProducts.filter(item => item.e.id !== action.payload.e.id),
                show:true
            }
        },
        emptyEqual: (state) => {
            state.equalProducts = []
        },
        showEqual:(state)=>{
            state.show=false
        }
    }
})

export const { addEqual, delItemToEqual, emptyEqual, showEqual } = equalSlice.actions
export default equalSlice.reducer