"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false };

export const todoModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        handleModalStatus: (state, action) => {
            state.open = action.payload;
        },
    }
});

export const {handleModalStatus} = todoModal.actions;
export default todoModal.reducer;