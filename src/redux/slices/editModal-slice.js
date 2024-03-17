"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = { editModalOpen: false, editTodo: null };

export const editTodoModal = createSlice({
    name: 'editmodal',
    initialState,
    reducers: {
        handleEditTodo: (state, action) => {
            state.editModalOpen = action.payload.editModalOpen;
            state.editTodo = action.payload.editTodo;
        },
    }
});

export const { handleEditTodo } = editTodoModal.actions;
export default editTodoModal.reducer;