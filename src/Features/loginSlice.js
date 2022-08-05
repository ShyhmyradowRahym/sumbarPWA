import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loginShow: false
}

export const LoginShowSlice = createSlice({
    name: 'loginShow',
    initialState,
    reducers: {
        handleLoginShow: (state, action) => {
            state. loginShow= action.payload
        }
    }
})

export const { handleLoginShow } = LoginShowSlice.actions

export default LoginShowSlice.reducer