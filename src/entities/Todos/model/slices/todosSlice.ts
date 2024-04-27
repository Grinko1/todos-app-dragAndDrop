import { createSlice } from '@reduxjs/toolkit'
import { TodosSchema } from '../types/todo'




export const edit = {
    listIndex: 0,
    itemIndex: 0,
    value: ''
}



const initialState: TodosSchema =
{
    loading: false,
    error: "",
    todoList: [
        {
            title: 'Задачи', todos: [

                { id: 2, title: "two task" },
                { id: 3, title: "three task" },
                { id: 4, title: "four task" },
                { id: 12, title: "two task" },
                { id: 13, title: "three task" },
                { id: 14, title: "four task" },
                { id: 22, title: "two task" },
                { id: 23, title: "three task" },
                { id: 24, title: "four task" },
                { id: 32, title: "two task" },
                { id: 33, title: "three task" },
                { id: 34, title: "four task" },
                { id: 42, title: "two task" },
                { id: 43, title: "three task" },
                { id: 44, title: "four task" },
                { id: 52, title: "two task" },
                { id: 53, title: "three task" },
                { id: 54, title: "four task" },
                { id: 62, title: "two task" },
                { id: 63, title: "three task" },
                { id: 64, title: "four task" },
                { id: 72, title: "two task" },
                { id: 73, title: "three task" },
                { id: 74, title: "four task" },
                { id: 82, title: "two task" },
                { id: 83, title: "three task" },
                { id: 84, title: "four task" },
                { id: 92, title: "two task" },
                { id: 93, title: "three task" },
                { id: 94, title: "four task" },
                { id: 21, title: "two task" },
                { id: 31, title: "three task" },
                { id: 41, title: "four task" },
                { id: 102, title: "two task" },
                { id: 103, title: "three task" },
                { id: 104, title: "four task" },
                { id: 112, title: "two task" },
                { id: 113, title: "three task" },
                { id: 114, title: "four task" },
                { id: 122, title: "two task" },
                { id: 123, title: "three task" },
                { id: 124, title: "four task" },
                { id: 132, title: "two task" },
                { id: 133, title: "three task" },
                { id: 134, title: "four task" },

            ]
        },
        { title: 'В работе', todos: [{ id: 1, title: "one task" },] },
        {
            title: 'Выполненые', todos: [{ id: 6, title: "six task" },
            { id: 5, title: "five task" }]
        }
    ]

}



export const todosSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        // LISTS HANDLERS -----------------------
        addNewTodo: (state, { payload }) => {
            { state.todoList[payload.index].todos.push({ id: 1, title: payload.value }) }
            // localStorage.setItem('@lists', JSON.stringify({ ...state }))
        },
        editTodo: (state, { payload }) => {
            state.todoList[edit.listIndex].todos[edit.itemIndex].title = payload
            // localStorage.setItem('@lists', JSON.stringify({ ...state }))
        },
        deleteTodo: (state, { payload }) => {
            { state.todoList[payload.listIndex].todos.splice(payload.index, 1) }
            // localStorage.setItem('@lists', JSON.stringify(state))
        },
        // DRAG AND DROP HANDLERS -------------
        moveCard: (state, { payload }) => {
            var stateCopy = state
            var item = state.todoList[payload.fromList].todos[payload.fromIndex]

            stateCopy.todoList[payload.fromList].todos.splice(payload.fromIndex, 1)
            stateCopy.todoList[payload.toList].todos.splice(payload.toIndex, 0, item)

            state = stateCopy
            // localStorage.setItem('@lists', JSON.stringify(state))
        },
    }
})

export const { actions: todosActions } = todosSlice
export const { reducer: todosReducer } = todosSlice
