import { createSlice } from "@reduxjs/toolkit";

const initialState = []
export const usersSlice = createSlice({
    name: "usersSlice",
    initialState: initialState,
    reducers: {
        getUsers: (state, action) => {
            state = action.payload;
            return state;
        },

        addUser: (state, action) => {
            [...state, action.payload];
        },

        removeUser: (state) => {
            state = state.filter(user => user.id !== action.payload);
        }, 
    },
});

export const {getUsers, addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;