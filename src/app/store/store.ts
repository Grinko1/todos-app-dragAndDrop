import { CombinedState, Reducer, ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { TodosSchema, todosReducer } from "../../entities/Todos";
import { AxiosInstance } from "axios";
import { $api } from "../../shared/api/api";
import { useDispatch } from "react-redux";
import { ModalSchema, modalReducer } from "../../entities/TodoModal";
import { StateSchema, ThunkExtraArg } from "./stateSchema";
import { createReducerManager } from "./reducerManager";


export function createReduxStore(
    initialState?: StateSchema,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {

        todos: todosReducer,
        modals: modalReducer,

    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: true,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}


// export const store = createReduxStore();

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();