import { createSlice } from "@reduxjs/toolkit";
const initalState = {
    loading: false,
    isLoggedIn: false,
    user:null
}

const loginSlice = createSlice({
    name: "login",
    initialState: initalState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("isLoggedIn", true);
        },
        loginFailure: (state) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
        },
        logout: (state) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.user = null;
        },  
    },
})

export const { loginRequest, loginSuccess, loginFailure, logout } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;