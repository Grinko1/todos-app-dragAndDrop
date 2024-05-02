import { createSlice } from '@reduxjs/toolkit'
import { edit } from '../../../Todos'
import { ModalSchema } from '../types/modal'





const initialState: ModalSchema = {
    newTodoModal: false,
    editTodoModal: false,
    profileModal: false,
    loginModal: false,
    signUpModal: false
}

export const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        newItemModal: (state) => {
            return { ...state, newTodoModal: !state.newTodoModal }
        },
        editModal: (state, { payload }) => {
            console.log(payload);
            edit.listIndex = payload.listIndex
            edit.itemIndex = payload.index
            edit.value = payload.value
            edit.updateTodo = payload.updateTodo

            return {
                ...state,
                editTodoModal: !state.editTodoModal
            }
        },
        profileModal: (state) => {
            return { ...state, profileModal: !state.profileModal }
        },
        toggleLoginModal: (state) => {
            return { ...state, loginModal: !state.loginModal }
        },
        toggleSignUpModal: (state) => {
            return { ...state, signUpModal: !state.signUpModal }
        }
    }
})

export const { actions: modalActions } = modalSlice
export const { reducer: modalReducer } = modalSlice
