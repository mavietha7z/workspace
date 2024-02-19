const { createSlice } = require('@reduxjs/toolkit');

const moduleReducer = createSlice({
    name: 'module',
    initialState: {
        sidebar: false,
    },
    reducers: {
        openSidebar: (state) => {
            state.sidebar = true;
        },

        closeSidebar: (state) => {
            state.sidebar = false;
        },
    },
});

export const { openSidebar, closeSidebar } = moduleReducer.actions;

export default moduleReducer.reducer;
