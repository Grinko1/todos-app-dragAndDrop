
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { EditTodoModal, NewTodoModal, getTodosModals } from "./entities/TodoModal"
import { getTodosList } from "./entities/Todos"
import { Navbar } from "./widgets/Navbar/Navbar"
import { SettingsModal } from "./entities/Setting/ui/SettingsModal/SettingsModal"
import { useTheme } from "./app/theme"


const App = () => {
    const { editTodoModal, newTodoModal, configModal } = useSelector(getTodosModals)
    const { theme } = useTheme();
    const todos = useSelector(getTodosList)


    return (
        <div className={`App ${theme}`}>
            {editTodoModal && <EditTodoModal />}
            {newTodoModal && <NewTodoModal />}
            {configModal && <SettingsModal />}
            <Navbar />
            <Board />
        </div>
    )
}

export default App