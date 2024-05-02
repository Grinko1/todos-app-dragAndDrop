import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { todosActions } from '../../../Todos';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { TodoForm } from '../TodoForm/TodoForm';
import { modalActions } from '../../../ModalsToggler';
import { UpdateTodoProps, addTodoService } from '../../../Todos/model/service/addTodoService';

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
            dispatch(todosActions.addNewTodo({ index, value }))
            //@ts-ignore
            dispatch(addTodoService({ title: value, index }))
            closeNewItemModal()
        }
    }

    return (


        <Modal isOpen={true} onClose={closeNewItemModal}>
            <TodoForm
                title="Добавить задачу"
                initialValue=""
                onSave={onSave}
                onClose={closeNewItemModal}
                buttons={buttons}
            />
        </Modal>

    );
});