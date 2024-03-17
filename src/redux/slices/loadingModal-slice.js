"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false };

export const loadModal = createSlice({
    name: 'load',
    initialState,
    reducers: {
        handleLoadStatus: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { handleLoadStatus } = loadModal.actions;
export default loadModal.reducer;