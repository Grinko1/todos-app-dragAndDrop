
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { EditTodoModal, getTodosModals } from "./entities/TodoModal"
import { getTodosList } from "./entities/Todos"

const App = () => {
    const { editTodoModal, newTodoModal } = useSelector(getTodosModals)
    const todos = useSelector(getTodosList)

    return (
        <div className='App'>
            {editTodoModal && <EditTodoModal />}
            <Board />
        </div>
    )
}

export default App