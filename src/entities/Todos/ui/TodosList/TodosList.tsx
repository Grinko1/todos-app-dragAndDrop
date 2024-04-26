import { memo } from 'react';
import cls from './TodosList.module.scss';
import { FaCheck, FaPencilAlt, FaRegClock } from 'react-icons/fa'
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { ListItem } from '../ListItem/ListItem';
import { TodoList } from '../../model/types/todo';


interface TodosListProps {
    listIndex?: number,
    data: TodoList,
}

export const TodosList = memo((props: TodosListProps) => {
    const { listIndex = 0, data } = props
    // console.log(data);

    const handleIcon = () => {
        const Icons = [<FaRegClock size={20} />, <FaPencilAlt size={20} />, <FaCheck size={20} />]
        return Icons[listIndex]
    }
    return (
        <div className={cls.TodosList}>
            <header>
                {handleIcon()}
                <h1>{data.title}</h1>
            </header>

            <Droppable droppableId={String(listIndex)}>
                {(provided: DroppableProvided) => (
                    <>
                        <ul ref={provided.innerRef} {...provided.droppableProps} >
                            {
                                data.todos.map((item, index) =>
                                    <ListItem key={index} listItem={item} listIndex={listIndex} index={index} />

                                )
                            }
                            {provided.placeholder}
                        </ul>
                    </>
                )}
            </Droppable>
        </div>
    );
});