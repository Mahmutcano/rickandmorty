import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { charactersReducer } from './characters.slice';

export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';
export * from './characters.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        characters: charactersReducer
    },
});