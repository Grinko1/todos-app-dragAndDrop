import { memo } from 'react';
import cls from './ListItem.module.scss';
import { useDispatch } from 'react-redux';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { BsList } from 'react-icons/bs'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Todo } from '../../model/types/todo';
import { todosActions } from '../../model/slices/todosSlice';
import { modalActions } from '../../../TodoModal';

interface ListItemProps {
    index: number
    listIndex: number
    listItem: Todo
}

export const ListItem = memo((props: ListItemProps) => {
    const { index, listIndex, listItem } = props
    const dispatch = useDispatch()

    const handleDeleteItem = (listIndex: number, index: number) => {
        dispatch(todosActions.deleteTodo({ listIndex, index }))
    }

    const openEditModal = () => {
        dispatch(modalActions.editModal({ listIndex, index, value: listItem.title }))
    }
    return (
        <Draggable key={listItem.id} draggableId={String(listItem.id)} index={index} >
            {(provided: DraggableProvided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={{ ...provided.draggableProps.style }}
                    className={cls.Item}
                >
                    <BsList size={24} />
                    <p>
                        {listItem.title}
                    </p>
                    <div className={cls.actions}>
                        <button onClick={openEditModal}>
                            <FaRegEdit size={22} />
                        </button>
                        <button onClick={() => handleDeleteItem(listIndex, index)}>
                            <FaRegTrashAlt size={20} />
                        </button>
                    </div>
                </div >
            )}
        </Draggable >
    );
});