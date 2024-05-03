import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";


export const logoutService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'login/logoutService',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;


        try {

            localStorage.removeItem("@token")
            localStorage.removeItem("@theme")
            localStorage.removeItem("@profile")
            localStorage.removeItem("@userId")

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);