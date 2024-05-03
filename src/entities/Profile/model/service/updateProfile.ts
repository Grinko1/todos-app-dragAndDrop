import { createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../types/profile";
import { ThunkConfig } from "../../../../app/store/stateSchema";


interface ProfileData {
    email: string,
    name: string
}

export const updateProfile = createAsyncThunk<
    Profile,
    ProfileData,
    ThunkConfig<string>
>(
    'profile/updateProfile',
    async (profile, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        const id = localStorage.getItem("@userId")

        try {
            const response = await extra.api.patch(`/api/user/${id}`, profile);
            if (!response.data) {
                throw new Error();
            }
            console.log(`%c${'response update profile:'}`, `color: ${'#2fa827'}`, response);

            // localStorage.setItem("@token", `Bearer ${response.data.token}`);
            // localStorage.setItem("@userId", response.data.user.id);
            // dispatch(profileActions.save(response.data.user))
            // dispatch(todosService())
            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);