import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { account: null },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload
        }
    },
});

export const { setAccount } = authSlice.actions;
export default authSlice.reducer;