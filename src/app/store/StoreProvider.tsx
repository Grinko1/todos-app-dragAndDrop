import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from './stateSchema';
import { createReduxStore } from './store';


interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const store = createReduxStore(
        initialState as StateSchema
    );

    console.log('RENDER');

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
