import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
        },

        logoutSuccess: (state) => {
            state.currentUser = null;
        },
    },
});

export const { loginSuccess, logoutSuccess } = authReducer.actions;

export default authReducer.reducer;
