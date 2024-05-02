import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";
import { ThunkConfig } from "../../../../app/store/stateSchema";
import { getProfile } from "../../../Profile/model/selectors/getProfile";




export const todosService = createAsyncThunk<
    Todo[],
    void,
    ThunkConfig<string>
>(
    'todos/getAllTodos',
    async (signUpData, thunkApi) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkApi;

        const id = localStorage.getItem("userId")
        try {
            const response = await extra.api.get(`/api/user/${id}/todos`);
            if (!response.data) {
                throw new Error();
            }
            console.log(`response /api/user/${id}/todos`, response);

            // localStorage.setItem("TOKEN", `Bearer ${response.data.token}`);
            // localStorage.setItem("userId", response.data.user.id);
            // dispatch(profileActions.save(response.data.user))


            return response.data;
        } catch (e) {
            //@ts-ignore
            return rejectWithValue(e.response.data.message);
        }
    },
);