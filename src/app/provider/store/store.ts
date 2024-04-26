// import { configureStore } from "@reduxjs/toolkit"
// import { todosReducer } from "../../../entities/Todos"

import { CombinedState, ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { TodosSchema, todosReducer } from "../../../entities/Todos";
import { AxiosInstance } from "axios";
import { $api } from "../../../shared/api/api";
import { useDispatch } from "react-redux";

// const store = configureStore({
//     reducer: {
//         lists: todosReducer,
//         // config: configReducer,
//         // modals: modalsReducer
//     }
// })

// export default store

// export type RootState = ReturnType<typeof store.getState>

export interface StateSchema {
    todos: TodosSchema
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        todos: todosReducer,
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