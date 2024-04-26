import { memo } from 'react';
import cls from './EditTodoModal.module.scss';
import { useAppDispatch } from '../../../../app/store/store';
import { edit, todosActions } from '../../../Todos';
import { TodoModal } from '../TodoModal/TodoModal';
import { modalActions } from '../../model/slices/modelSlice';

interface EditTodoModalProps {
}

export const EditTodoModal = memo((props: EditTodoModalProps) => {
    const { } = props
    const dispatch = useAppDispatch()


    const closeEditModal = () => {
        dispatch(modalActions.editModal(edit.value))
    }

    const onSave = (value: string) => {
        if (value) {
            dispatch(todosActions.editTodo(value));
            closeEditModal();
        }
    };
    ;
    const buttons = ["Сохранить"];


    return (
        <TodoModal
            title="Редактировать"
            initialValue={edit.value}
            onSave={onSave}
            onClose={closeEditModal}
            buttons={buttons}
        />
    );
});