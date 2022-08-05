import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signShow: false
}

export const SignShowSlice = createSlice({
    name: 'signShow',
    initialState,
    reducers: {
        handleSignShow: (state, action) => {
            state. SignInShow = action.payload
        }
    }
})

export const { handleSignShow } = SignShowSlice.actions

export default SignShowSlice.reducer