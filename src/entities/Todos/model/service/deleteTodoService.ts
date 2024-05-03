import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "../../../../app/store/stateSchema";



export const deleteTodoService = createAsyncThunk<
    void,
    number,
    ThunkConfig<string>
>(
    'todos/deleteTodo',
    async (todoId, thunkApi) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkApi;


        const id = localStorage.getItem("@userId")
        try {
            const response = await extra.api.delete(`/api/user/${id}/todos/${todoId}`);
            if (!response.data) {
                throw new Error();
            }
            console.log(`%c${'response delete todo:'}`, `color: ${'#2fa827'}`, response);



            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);