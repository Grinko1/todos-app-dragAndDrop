import { ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { TodosSchema, todosReducer } from "../../entities/Todos";
import { AxiosInstance } from "axios";
import { $api } from "../../shared/api/api";
import { useDispatch } from "react-redux";
import { ModalSchema, modalReducer } from "../../entities/TodoModal";


export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

/*
* important add state schema for types state
*/

export interface StateSchema {
    todos: TodosSchema
    modals: ModalSchema
}


export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        todos: todosReducer,
        modals: modalReducer
    };


    const extraArg: ThunkExtraArg = {
        api: $api
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });



    return store;
}

export const store = createReduxStore();
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();