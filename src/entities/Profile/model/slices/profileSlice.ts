import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";






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

    }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
