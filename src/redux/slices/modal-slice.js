"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = { open: false, selectedTodo: null };

export const todoModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        handleModalStatus: (state, action) => {
            state.open = action.payload.open;
            state.selectedTodo = action.payload.todo;
        },
    }
});

export const { handleModalStatus } = todoModal.actions;
export default todoModal.reducer;