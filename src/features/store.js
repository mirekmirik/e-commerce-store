import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import categoriesSlice from "./categories/categoriesSlice"
import productsSlice from "./products/productsSlice"
import { apiSlice } from "./api/apiSlice"
import userSlice from "./user/userSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
}

const appReducer = combineReducers({
    categories: categoriesSlice,
    products: productsSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
});


const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
    }

    return appReducer(state, action)
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export const persistor = persistStore(store);


// export const store = configureStore({
//     reducer: {
//         categories: categoriesSlice,
//         products: productsSlice,
//         user: userSlice,
//         [apiSlice.reducerPath]: apiSlice.reducer
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//     devTools: true,
// })



