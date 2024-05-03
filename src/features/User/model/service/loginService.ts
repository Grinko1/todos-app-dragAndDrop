import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { LoginData, LoginResponse } from "../types/login";
import { profileActions } from "../../../../entities/Profile";
import { todosService } from "../../../../entities/Todos";





export const loginService = createAsyncThunk<
    LoginResponse,
    LoginData,
    ThunkConfig<string>
>(
    'login/LoginByEmail',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;


        try {
            const response = await extra.api.post('/auth/sign-in', authData);
            if (!response.data) {
                throw new Error();
            }
            console.log(`%c${'response login:'}`, `color: ${'#2fa827'}`, response);

            localStorage.setItem("@token", `Bearer ${response.data.token}`);
            localStorage.setItem("@userId", response.data.user.id);
            dispatch(profileActions.save(response.data.user))
            dispatch(todosService())
            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);