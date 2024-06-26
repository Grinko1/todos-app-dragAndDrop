import { AnyAction, CombinedState, EnhancedStore, ReducersMapObject, Reducer } from "@reduxjs/toolkit";

import { TodosSchema } from "../../entities/Todos";

import { AxiosInstance } from "axios";
import { ProfileSchema } from "../../entities/Profile";
import { ModalSchema } from "../../entities/ModalsToggler";
import { LoginSchema } from "../../features/User";

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

export interface StateSchema {
    todos: TodosSchema,
    modals: ModalSchema,
    profile: ProfileSchema,
    login: LoginSchema
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - вмонтирован, false - демонтирован
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
