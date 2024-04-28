
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { EditTodoModal, NewTodoModal } from "./entities/TodoModal"
import { Navbar } from "./widgets/Navbar/Navbar"
import { useTheme } from "./app/theme"
import { LoginModal, SignUpModal } from "./features/User"
import { getModals } from "./entities/ModalsToggler"
import { ProfileModal } from "./entities/Profile/ui/ProfileModal/ProfileModal"


const App = () => {
    const { editTodoModal, newTodoModal, profileModal, loginModal, signUpModal } = useSelector(getModals)
    const { theme } = useTheme();


    return (
        <div className={`App ${theme}`}>
            {editTodoModal && <EditTodoModal />}
            {newTodoModal && <NewTodoModal />}
            {profileModal && <ProfileModal />}
            {loginModal && <LoginModal />}
            {signUpModal && <SignUpModal />}
            <Navbar />
            <Board />
        </div>
    )
}

export default App