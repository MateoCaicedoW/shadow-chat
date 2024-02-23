import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: initialState,

    reducers: {
        setCurrentUser: (state, action) => {
            state.value = action.payload;
        },

        removeCurrentUser: (state) => {
            state.value = null;
        },

    },
});

export const { setCurrentUser, removeCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;