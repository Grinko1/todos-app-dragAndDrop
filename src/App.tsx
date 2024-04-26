
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { EditTodoModal, getTodosModals } from "./entities/TodoModal"

const App = () => {
    const { editTodoModal, newTodoModal } = useSelector(getTodosModals)

    return (
        <div className='App'>
            {editTodoModal && <EditTodoModal />}
            <Board />
        </div>
    )
}

export default App