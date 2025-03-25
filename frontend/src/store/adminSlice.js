import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
});


export default adminSlice.reducer;