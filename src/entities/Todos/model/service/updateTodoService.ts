import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { Todo } from "../types/todo";


interface UpdateTodoProps {
    todo: Todo,
    index?: number
}

export const updateTodoService = createAsyncThunk<
    Todo,
    UpdateTodoProps,
    ThunkConfig<string>
>(
    'todos/updateTodo',
    async (data, thunkApi) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkApi;
        let updatedTodo = { ...data.todo }
        console.log(updatedTodo);

        if (data.index !== null || data.index !== undefined) {
            if (data.index === 0) {
                updatedTodo.status = 'PENDING_STATUS'
            } else if (data.index === 1) {
                updatedTodo.status = 'PROGRESS_STATUS';
            } else if (data.index === 2) {
                updatedTodo.status = 'COMPLETED_STATUS';

            }
        }

        console.log(updatedTodo);
        const id = localStorage.getItem("userId")
        try {
            const response = await extra.api.patch(`/api/user/${id}/todos/${data.todo.id}`, updatedTodo);
            if (!response.data) {
                throw new Error();
            }
            console.log(`%c${'response update todo:'}`, `color: ${'#2fa827'}`, response);



            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);