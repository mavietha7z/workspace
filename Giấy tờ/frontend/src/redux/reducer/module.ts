import configs from '~/configs';
import { createSlice } from '@reduxjs/toolkit';

const { home } = configs.routes;

const moduleReducer = createSlice({
    name: 'module',
    initialState: {
        navbar: [
            {
                title: 'Trang chủ',
                slug: home,
                services: [],
            },
        ],
    },
    reducers: {
        setCategories: (state, action) => {
            const categories = action.payload.filter(
                (category: { title: string; slug: string }) => !state.navbar.some((item) => item.slug === category.slug)
            );
            state.navbar = [...state.navbar, ...categories];
        },
    },
});

export const { setCategories } = moduleReducer.actions;

export default moduleReducer.reducer;
