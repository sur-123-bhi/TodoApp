"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    todos: []
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload; // Set the todos array to the provided payload array
        },
        // You can add more reducers here as needed
    }
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
