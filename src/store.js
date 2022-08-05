import { configureStore, combineReducers } from '@reduxjs/toolkit'
import navToggleReducer from './Features/NavToggleSlice'
import cartReducer from './Features/cartSlice'
import favReducer from './Features/favSlice'
import equalReducer from './Features/equalSlice'
import loginShowReducer from './Features/loginSlice'
import signShowReducer from './Features/signSlice'
import profileShowReducer from './Features/profileSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    navToggle: navToggleReducer,
    cart: cartReducer,
    fav: favReducer,
    equal:equalReducer,
    loginShow:loginShowReducer,
    signShow:signShowReducer,
    profileShow:profileShowReducer
}

)
const persistConfig = {
    key: 'rot',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store)
export default store;