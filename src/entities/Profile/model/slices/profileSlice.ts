import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";






const localStorageProfile = localStorage.getItem('@profile')

export const initialState: ProfileSchema =
    localStorageProfile
        ?
        JSON.parse(localStorageProfile)
        :
        {
            id: null,
            name: "",
            email: "",
        }

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        save: (state, { payload }) => {
            state.id = payload.id
            state.name = payload.name
            state.email = payload.email
            localStorage.setItem('@profile', JSON.stringify(payload))
        }

    }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
