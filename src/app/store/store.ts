import { CombinedState, Reducer, ReducersMapObject, configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "../../entities/Todos";;
import { $api } from "../../shared/api/api";
import { useDispatch } from "react-redux";

import { StateSchema, ThunkExtraArg } from "./stateSchema";
import { createReducerManager } from "./reducerManager";
import { modalReducer } from "../../entities/ModalsToggler";
import { profileReducer } from "../../entities/Profile";


export function createReduxStore(
    initialState?: StateSchema,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {

        todos: todosReducer,
        modals: modalReducer,
        profile: profileReducer

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