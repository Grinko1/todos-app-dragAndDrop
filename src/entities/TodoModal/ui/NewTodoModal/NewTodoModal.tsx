import { memo, useState } from 'react';
import cls from './NewTodoModal.module.scss';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../model/slices/modelSlice';
import { todosActions } from '../../../Todos';
import { TodoModal } from '../TodoModal/TodoModal';

interface NewTodoModalProps {
}

export const NewTodoModal = memo((props: NewTodoModalProps) => {
    const { } = props
    const buttons = ['В задачи', 'В работе', 'Выполненая']

    const dispatch = useDispatch()

    const closeNewItemModal = () => {
        dispatch(modalActions.newItemModal())
    }

    const onSave = (value: string, index?: number,) => {
        if (value) {
            console.log(value, index);
            dispatch(todosActions.addNewTodo({ index, value }))
            closeNewItemModal()
        }
    }

    return (
        <div className={cls.NewTodoModal}>
            <TodoModal
                title="Добавить задачу"
                initialValue=""

                onSave={onSave}
                onClose={closeNewItemModal}
                buttons={buttons}
            />
        </div>
    );
});