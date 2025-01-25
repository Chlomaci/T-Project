import {configureStore} from "@reduxjs/toolkit";
import {fakestoreApi} from "./services/fakestore";

export const store = configureStore({
    reducer: {
        [fakestoreApi.reducerPath]: fakestoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fakestoreApi.middleware)
})