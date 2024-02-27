import { createSlice } from "@reduxjs/toolkit";

const initialState = []
export const chatSlice = createSlice({
    name: "chats",
    initialState: initialState,
    reducers: {
        getChats: (state, action) => {
            state = action.payload;
            return state;
        },

        addChat: (state, action) => {
            state.push(action.payload);
        },

        removeChat: (state) => {
            state = state.filter(chat => chat.id !== action.payload);
        }, 
    },
});

export const {getChats, addChat, removeChat } = chatSlice.actions;
export default chatSlice.reducer;