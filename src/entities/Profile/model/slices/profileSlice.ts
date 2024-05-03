import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";
import { updateProfile } from "../service/updateProfile";






const localStorageProfile = localStorage.getItem('@profile')

export const initialState: ProfileSchema = {
    isLoading: false,
    error: null,
    profile: localStorageProfile
        ?
        JSON.parse(localStorageProfile)
        :
        {
            id: null,
            name: "",
            email: "",
        },
}




export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        save: (state, { payload }) => {
            state.profile.id = payload.id
            state.profile.name = payload.name
            state.profile.email = payload.email
            localStorage.setItem('@profile', JSON.stringify(payload))
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.error = null;
                state.isLoading = false;

            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;

            })
    }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
