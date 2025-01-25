// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { decodeToken, isTokenExpired } from '../componets/Utils/jwtUtils';

const initialState = {
    token: localStorage.getItem('token') || null,
    user: null,
    userRole: null,
    loggedIn: false,
    loading: true,
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const decodedToken = decodeToken(action.payload.token);
            if (!decodedToken) return;

            state.token = action.payload.token;
            state.user = decodedToken;
            state.userRole = decodedToken.role;
            state.loggedIn = true;
            state.userId=decodedToken.id._id;

            localStorage.setItem('token', action.payload.token);
        },
        checkAuthStatus: (state) => {
            state.loading = true;
            const token = state.token || localStorage.getItem('token');
            if (token && !isTokenExpired(token)) {
                const decodedToken = decodeToken(token);
                if (!decodedToken) return;
console.log(decodedToken)
                state.loggedIn = true;
                state.user = decodedToken;
                state.userRole = decodedToken.id.role;
                state.userId=decodedToken.id._id;
                state.username=decodedToken.id.name;

                console.log("",state.name)
            } else {
                state.loggedIn = false;
                state.token = null;
                state.user = null;
                state.userRole = 'user';
                localStorage.removeItem('token');
            }
            state.loading = false;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.userRole = 'user';
            state.loggedIn = false;

            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, checkAuthStatus, logout } = authSlice.actions;
export default authSlice.reducer;
