"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoModalReducer from './slices/modal-slice';

export const store = configureStore({
    reducer: {
        modal: todoModalReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})