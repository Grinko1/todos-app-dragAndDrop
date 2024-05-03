import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { mapStatus } from "../utils/mapTodoStatus";


export interface UpdateTodoProps {
    title: string,
    index?: number
}

export const addTodoService = createAsyncThunk<
    Todo,
    UpdateTodoProps,
    ThunkConfig<string>
>(
    'todos/addTodo',
    async (data, thunkApi) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkApi;

        const id = localStorage.getItem("userId")
        let newTodo = {
            title: data.title, status: '',
            userId: id
        }

        console.log(mapStatus(2, { id: 1, title: "dsf", status: "", }));

        if (data.index !== null || data.index !== undefined) {
            if (data.index === 0) {
                newTodo.status = 'PENDING_STATUS'
            } else if (data.index === 1) {
                newTodo.status = 'PROGRESS_STATUS';
            } else if (data.index === 2) {
                newTodo.status = 'COMPLETED_STATUS';

            }
        }


        try {
            const response = await extra.api.post(`/api/user/${id}/todos`, newTodo);
            if (!response.data) {
                throw new Error();
            }
            console.log(`%c${'response add new todo:'}`, `color: ${'#2fa827'}`, response);




            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);