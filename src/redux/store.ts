import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { productSlice } from './slices/product'

const persistConfig = {
    key: "bpkey",
    version: 1,
    storage,
    blacklist: ['loading', 'list', 'dialogConfig']
}

const reducer = combineReducers({
    product: productSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store;