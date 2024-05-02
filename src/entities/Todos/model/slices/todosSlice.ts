import { createSlice } from '@reduxjs/toolkit'
import { TodosSchema } from '../types/todo'
import { todosService } from '../service/todosService'




export const edit = {
    listIndex: 0,
    itemIndex: 0,
    value: ''
}



const initialState: TodosSchema =
{
    isLoading: false,
    error: "",
    todoList: [
        {
            title: 'Задачи', todos: [

                { id: 10002, title: "two mock task" },
                { id: 10003, title: "three mock task" },
                { id: 10004, title: "four mock task" },
            ]
        },
        { title: 'В работе', todos: [{ id: 10001, title: "one mock task" },] },
        {
            title: 'Выполненые', todos: [{ id: 10006, title: "six mock task" },
            { id: 10005, title: "five mocktask" }]
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

            //     console.log(state.todoList[payload.fromList].todos[payload.fromIndex]);

            //     var stateCopy = state
            //     var item = state.todoList[payload.fromList].todos[payload.fromIndex]
            //     stateCopy.todoList[payload.fromList].todos.splice(payload.fromIndex, 1)
            //     stateCopy.todoList[payload.toList].todos.splice(payload.toIndex, 0, item)

            //     if (payload.toList === 0) {
            //         console.log("update todo new status PENDING_STATUS");
            //     } else if (payload.toList === 1) {
            //         console.log("update todo new status PROGRESS_STATUS");
            //     } else {
            //         console.log("update todo new status COMPLETED_STATUS");
            //     }

            //     state = stateCopy

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
                console.log(action.payload);
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