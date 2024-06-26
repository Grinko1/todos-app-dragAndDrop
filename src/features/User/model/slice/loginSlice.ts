import { createSlice } from "@reduxjs/toolkit"
import { LoginSchema } from "../types/login"
import { loginService } from "../service/loginService"
import { signUpService } from "../service/signUpService"



export const initialState: LoginSchema = {
    error: null,
    isLoading: false,
    token: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        save: (state, { payload }) => {
        },
        resetError: (state) => {
            state.error = null
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginService.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(loginService.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.token = action.payload.token
            })
            .addCase(loginService.rejected, (state, action) => {
                state.isLoading = false,
                    state.error = action.payload

            })
            .addCase(signUpService.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(signUpService.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.token = action.payload.token
            })
            .addCase(signUpService.rejected, (state, action) => {
                state.isLoading = false,
                    state.error = action.payload

            })
    }
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice