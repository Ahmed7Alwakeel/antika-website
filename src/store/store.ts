import { configureStore } from "@reduxjs/toolkit";
import authData from "../modules/user/store/redux/authData";


export const store = configureStore({
    reducer: {
        authData

    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;