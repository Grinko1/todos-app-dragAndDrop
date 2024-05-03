import { StateSchema } from "../../../../app/store/stateSchema";



export const getTodosList = (state: StateSchema) => state.todos.todoList

export const getTodosLoading = (state: StateSchema) => state.todos.isLoading

export const getTodosQtt = (state: StateSchema) => {
    const list = state.todos.todoList
    return list[0].todos.length + list[1].todos.length + list[1].todos.length
}