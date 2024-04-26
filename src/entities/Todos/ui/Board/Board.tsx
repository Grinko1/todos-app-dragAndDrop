import { memo, useEffect } from 'react';
import cls from './Board.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import { TodosList } from '../TodosList/TodosList';
import { useAppDispatch } from '../../../../app/store/store';
import { useSelector } from 'react-redux';
import { getTodosList } from '../../model/selectors/getTodos';
import { todosActions } from '../../model/slices/todosSlice';




interface BoardProps {
}

export const Board = memo((props: BoardProps) => {
    const { } = props
    const dispatch = useAppDispatch()
    const todoList = useSelector(getTodosList)

    const handleDropEnd = (result: any) => {
        const { destination, source } = result
        console.log(result);

        if (destination) {
            dispatch(todosActions.moveCard({
                fromList: Number(source.droppableId),
                toList: Number(destination.droppableId),
                fromIndex: source.index,
                toIndex: destination.index
            }))
        }
    }

    useEffect(() => {
        if (todoList[0].todos.length > 0) {
            document.title = `(${todoList[0].todos.length}) To do list`;
        } else {
            document.title = `To do list`;
        }
    })
    return (
        <div className={cls.Board}>
            <DragDropContext onDragEnd={handleDropEnd}>
                {
                    todoList.map((data, index) =>
                        <TodosList key={index} data={data} listIndex={index} />
                    )
                }
            </DragDropContext>
        </div>
    );
});