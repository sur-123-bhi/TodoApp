"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoModalReducer from './slices/modal-slice';
import setTodosReducer from "./slices/todo-slice";
import editTodoReducer from './slices/editModal-slice';
import loadReducer from './slices/loadingModal-slice';

export const store = configureStore({
    reducer: {
        modal: todoModalReducer,
        todo: setTodosReducer,
        editmodal: editTodoReducer,
        load: loadReducer,
    },
    devTools: process.env.NODE_ENV !== 'production'
})