
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { EditTodoModal, NewTodoModal, getTodosModals } from "./entities/TodoModal"
import { getTodosList } from "./entities/Todos"
import { Navbar } from "./widgets/Navbar/Navbar"

const App = () => {
    const { editTodoModal, newTodoModal } = useSelector(getTodosModals)
    const todos = useSelector(getTodosList)

    return (
        <div className='App'>
            {editTodoModal && <EditTodoModal />}
            {newTodoModal && <NewTodoModal />}
            <Navbar />
            <Board />
        </div>
    )
}

export default App