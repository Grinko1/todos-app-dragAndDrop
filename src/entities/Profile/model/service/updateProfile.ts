import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { profileActions } from "../slices/profileSlice";
import { LoginResponse } from "../../../../features/User";


interface ProfileData {
    email: string,
    name: string
}

export const updateProfile = createAsyncThunk<
    LoginResponse,
    ProfileData,
    ThunkConfig<string>
>(
    'profile/updateProfile',
    async (profile, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const id = localStorage.getItem("@userId")

        try {
            const response = await extra.api.patch(`/auth/user/${id}`, profile);
            if (!response.data) {
                throw new Error();
            }
            console.log(`%c${'response update profile:'}`, `color: ${'#2fa827'}`, response);

            dispatch(profileActions.save(response.data.user))
            localStorage.setItem("@token", `Bearer ${response.data.token}`);
            localStorage.setItem("@userId", response.data.user.id);

            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);