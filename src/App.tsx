
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { EditTodoModal, NewTodoModal } from "./entities/TodoModal"
import { Navbar } from "./widgets/Navbar/Navbar"
import { SettingsModal } from "./entities/Setting/ui/SettingsModal/SettingsModal"
import { useTheme } from "./app/theme"
import { LoginModal, SignUpModal } from "./features/User"
import { getModals } from "./entities/ModalsToggler"


const App = () => {
    const { editTodoModal, newTodoModal, configModal, loginModal, signUpModal } = useSelector(getModals)
    const { theme } = useTheme();


    return (
        <div className={`App ${theme}`}>
            {editTodoModal && <EditTodoModal />}
            {newTodoModal && <NewTodoModal />}
            {configModal && <SettingsModal />}
            {loginModal && <LoginModal />}
            {signUpModal && <SignUpModal />}
            <Navbar />
            <Board />
        </div>
    )
}

export default App