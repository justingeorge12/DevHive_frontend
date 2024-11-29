// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../services/constants";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        role: localStorage.getItem('role'),
        user_id: localStorage.getItem('user_id'),
        access_token: localStorage.getItem('access'),
        refresh_token: localStorage.getItem('refresh'),
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.role = action.payload.role;
            state.user_id = action.payload.user_id;
            localStorage.setItem(ACCESS_TOKEN, action.payload.access_token);
            localStorage.setItem(REFRESH_TOKEN, action.payload.refresh_token);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('user_id', action.payload.user_id);
        },
        logout: (state) => {
            state.access_token = null;
            state.refresh_token = null;
            state.role = null;
            state.user_id = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;



















// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name : 'auth',
//     initialState : {
//         role : localStorage.getItem('role'),
//         user_id : localStorage.getItem('user_id')
//     },
    
//     reducers : {
//         setRole: (state, action) => {
//             state.role = action.payload;
//             localStorage.setItem('role', action.payload);
//         },
//         setUserId: (state, action) => {
//             state.user_id = action.payload;
//             localStorage.setItem('user_id', action.payload);
//         },
//         clearAuth: (state) => {
//             state.role = null;
//             state.user_id = null;
//             localStorage.removeItem('role');
//             localStorage.removeItem('user_id');
//         },
//     }
// })

// export default authSlice.reducer