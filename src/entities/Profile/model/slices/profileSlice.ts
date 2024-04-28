import { createSlice } from "@reduxjs/toolkit";
import { ProfileSchema } from "../types/profile";
import { Theme } from "../../../../app/theme";





const localStorageProfile = localStorage.getItem('@profile')

export const initialState: ProfileSchema =
    localStorageProfile
        ?
        JSON.parse(localStorageProfile)
        :
        {
            name: "",
            email: "",
            theme: Theme.DARK
        }

export const profileSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        save: (state, { payload }) => {


            localStorage.setItem('@profile', JSON.stringify(state))
        }

    }
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
