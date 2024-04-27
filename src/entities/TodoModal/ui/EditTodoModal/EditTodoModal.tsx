import { memo } from 'react';
import { useAppDispatch } from '../../../../app/store/store';
import { edit, todosActions } from '../../../Todos';

import { TodoForm } from '../TodoForm/TodoForm';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { modalActions } from '../../../ModalsToggler';

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
        <Modal isOpen={true} onClose={closeEditModal}>
            <TodoForm
                title="Редактировать"
                initialValue={edit.value}
                onSave={onSave}
                onClose={closeEditModal}
                buttons={buttons}
            />
        </Modal>
    );
});