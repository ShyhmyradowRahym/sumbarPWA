import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    navToggle: true
}

export const NavToggleSlice = createSlice({
    name: 'navToggle',
    initialState,
    reducers: {
        handleNavToggle: (state) => {
            state.navToggle = !state.navToggle
        }
    }
})

export const { handleNavToggle } = NavToggleSlice.actions

export default NavToggleSlice.reducer