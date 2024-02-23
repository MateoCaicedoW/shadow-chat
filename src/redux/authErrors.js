import {createSlice} from '@reduxjs/toolkit';

export const emptyAuthErrors = {
    email: [],
    first_name: [],
    last_name: [],
};

export const authErrorsSlice = createSlice({
    name: 'authErrors',
    initialState: emptyAuthErrors,
    reducers: {
        setAuthErrors: (state, action) => {
            state = action.payload;
            return state;
        },
    },
})

export const {setAuthErrors} = authErrorsSlice.actions;
export default authErrorsSlice.reducer;