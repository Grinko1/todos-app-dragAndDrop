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
            title: 'todo', todos: [
                { id: 1, title: "one task" },
                { id: 2, title: "two task" },
                { id: 3, title: "three task" },
                { id: 4, title: "four task" }
            ]
        },
        { title: 'doing', todos: [] },
        { title: 'done', todos: [] }
    ]

}



export const todosSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        // LISTS HANDLERS -----------------------
        addNewTodo: (state, { payload }) => {
            console.log(payload);
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
            console.log(payload);
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
