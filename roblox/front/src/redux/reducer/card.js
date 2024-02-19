const { createSlice } = require('@reduxjs/toolkit');

const cardReducer = createSlice({
    name: 'card',
    initialState: {
        currentCard: null,
        memberCard: [],
        selectCard: null,
    },
    reducers: {
        postCurrentCard: (state, action) => {
            state.currentCard = action.payload;
            state.selectCard = null;
        },

        postMemberCard: (state, action) => {
            state.memberCard = action.payload;
        },

        postSelectCard: (state, action) => {
            state.selectCard = action.payload;
        },
    },
});

export const { postCurrentCard, postMemberCard, postSelectCard } = cardReducer.actions;

export default cardReducer.reducer;
