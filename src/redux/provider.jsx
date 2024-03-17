"use client";

import { store } from './store'; // Assuming './store' is the correct path to your Redux store
import { Provider } from 'react-redux'; // Importing Provider from react-redux

function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;