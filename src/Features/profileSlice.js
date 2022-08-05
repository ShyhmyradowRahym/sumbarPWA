import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    profileShow: false
}

export const ProfileShowSlice = createSlice({
    name: 'profileShow',
    initialState,
    reducers: {
        handleProfileShow: (state, action) => {
            state.profileShow = action.payload
        }
    }
})

export const { handleProfileShow } = ProfileShowSlice.actions

export default ProfileShowSlice.reducer