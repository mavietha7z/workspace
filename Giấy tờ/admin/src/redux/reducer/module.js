import { createSlice } from '@reduxjs/toolkit';

const moduleReducer = createSlice({
    name: 'module',
    initialState: {
        sidebar: 1,
    },
    reducers: {
        openSidebar: (state) => {
            state.sidebar = 1;
        },
        closeSidebar: (state) => {
            state.sidebar = 0;
        },
    },
});

export const { openSidebar, closeSidebar } = moduleReducer.actions;

export default moduleReducer.reducer;
