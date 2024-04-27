import { createSlice } from "@reduxjs/toolkit";
import { SettingsSchema } from "../types/settings";




const localStorageConfig = localStorage.getItem('@config')

export const initialState: SettingsSchema =
    localStorageConfig
        ?
        JSON.parse(localStorageConfig)
        :
        {
            background1: '#00c8ff',
            background2: '#b300ff',
            glassColor: '#000000',
            opacity: '40',
            color: '#ffffff'
        }

export const settingsSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        save: (state, { payload }) => {
            state.background1 = payload.background1
            state.background2 = payload.background2
            state.glassColor = payload.glassColor
            state.opacity = payload.opacity
            state.color = payload.color

            localStorage.setItem('@config', JSON.stringify(state))
        }

    }
})

export const { actions: settingsActions } = settingsSlice
export const { reducer: settingsReducer } = settingsSlice
