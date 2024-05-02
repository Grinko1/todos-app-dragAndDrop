import { memo } from 'react';
import { useAppDispatch } from '../../../../app/store/store';
import { edit, todosActions } from '../../../Todos';

import { TodoForm } from '../TodoForm/TodoForm';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { modalActions } from '../../../ModalsToggler';
import { updateTodoService } from '../../../Todos/model/service/updateTodoService';

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

            console.log("edit for update", edit.updateTodo);
            console.log("value for dispatch", value);
            let updatedTodo = { ...edit.updateTodo }
            //@ts-ignore
            updatedTodo.title = value
            console.log(updatedTodo);
            //@ts-ignore
            dispatch(updateTodoService({ todo: updatedTodo }))
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