import { createSlice } from '@reduxjs/toolkit'
import { edit } from '../../../Todos'
import { ModalSchema } from '../types/modal'




const initialState: ModalSchema = {
    newTodoModal: false,
    editTodoModal: false,
    configModal: false
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        newItemModal: (state) => {
            return { ...state, newTodoModal: !state.newTodoModal }
        },
        editModal: (state, { payload }) => {
            edit.listIndex = payload.listIndex
            edit.itemIndex = payload.index
            edit.value = payload.value

            return {
                ...state,
                editTodoModal: !state.editTodoModal
            }
        },
        configModal: (state) => {
            return { ...state, configModal: !state.configModal }
        }
    }
})

export const { actions: modalActions } = modalSlice
export const { reducer: modalReducer } = modalSlice
