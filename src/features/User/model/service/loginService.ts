import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { LoginData } from "../types/login";
import { profileActions } from "../../../../entities/Profile";



interface LoginResponse {
    token: string,
    user: {
        id: number,
        name: string,
        email: string
    }
}

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
            console.log("response /auth/sign-in", response);

            localStorage.setItem("TOKEN", `Bearer ${response.data.token}`);
            localStorage.setItem("userId", response.data.user.id);
            dispatch(profileActions.save(response.data.user))
            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);