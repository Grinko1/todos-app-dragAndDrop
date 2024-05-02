import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { LoginData, LoginResponse, SignUpData } from "../types/login";
import { profileActions } from "../../../../entities/Profile";





export const signUpService = createAsyncThunk<
    LoginResponse,
    SignUpData,
    ThunkConfig<string>
>(
    'login/signUp',
    async (signUpData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;


        try {
            const response = await extra.api.post('/auth/sign-up', signUpData);
            if (!response.data) {
                throw new Error();
            }
            console.log("response /auth/sign-up", response);

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