import { createSlice } from '@reduxjs/toolkit'
import { Todo, TodosSchema } from '../types/todo'
import { todosService } from '../service/todosService'

interface EditType {
    listIndex: number,
    itemIndex: number,
    value: string,
    updateTodo: Todo | null
}


export const edit: EditType = {
    listIndex: 0,
    itemIndex: 0,
    value: '',
    updateTodo: null
}



const initialState: TodosSchema =
{
    isLoading: false,
    error: "",
    todoList: [
        {
            title: 'Задачи', todos: [
            ]
        },
        {
            title: 'В работе', todos: [
            ]
        },
        {
            title: 'Выполненые', todos: [
            ]
        }
    ]

}



export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // TODOS HANDLERS
        addNewTodo: (state, { payload }) => {
            { state.todoList[payload.index].todos.push({ id: 1, title: payload.value }) }

        },
        editTodo: (state, { payload }) => {
            state.todoList[edit.listIndex].todos[edit.itemIndex].title = payload

        },
        deleteTodo: (state, { payload }) => {
            { state.todoList[payload.listIndex].todos.splice(payload.index, 1) }

        },
        // DRAG AND DROP 
        moveCard: (state, { payload }) => {
            const { fromList, fromIndex, toList, toIndex } = payload;
            const item = state.todoList[fromList].todos[fromIndex];

            // Remove item from original list
            state.todoList[fromList].todos.splice(fromIndex, 1);

            // Insert item into new list at specified index
            state.todoList[toList].todos.splice(toIndex, 0, item);

            // Update status of moved todo
            const status = getStatusFromListIndex(toList);
            state.todoList[toList].todos[toIndex].status = status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todosService.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(todosService.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                if (state.todoList[0].todos.length + state.todoList[0].todos.length + state.todoList[0].todos.length === 0) {
                    action.payload.forEach(todo => {
                        switch (todo.status) {
                            case 'PENDING_STATUS':
                                state.todoList[0].todos.push(todo)
                                break;
                            case 'PROGRESS_STATUS':
                                state.todoList[1].todos.push(todo)
                                break;
                            case 'COMPLETED_STATUS':
                                state.todoList[2].todos.push(todo)
                                break;
                            default:
                                break;
                        }
                    })
                }

            })
            .addCase(todosService.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const { actions: todosActions } = todosSlice
export const { reducer: todosReducer } = todosSlice

const getStatusFromListIndex = (index: number) => {
    switch (index) {
        case 0:
            return 'PENDING_STATUS';
        case 1:
            return 'PROGRESS_STATUS';
        case 2:
            return 'COMPLETED_STATUS';
        default:
            return '';
    }
};