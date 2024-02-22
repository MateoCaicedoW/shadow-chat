import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUserSlice";
import authErrorsReducer from "./authErrors";

export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        authErrors : authErrorsReducer,
    },
});
