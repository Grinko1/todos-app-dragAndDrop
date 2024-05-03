
import { useSelector } from "react-redux"
import { Board } from "./entities/Todos/ui/Board/Board"
import { Navbar } from "./widgets/Navbar/Navbar"
import { useTheme } from "./app/theme"
import { ModalsToggler, getModals, modalActions } from "./entities/ModalsToggler"
import { useEffect } from "react"
import { useAppDispatch } from "./app/store/store"
import { getTodosQtt, todosService } from "./entities/Todos"
import { getProfile } from "./entities/Profile"


const App = () => {
    const { loginModal } = useSelector(getModals)
    const { theme } = useTheme();
    const { name, email } = useSelector(getProfile)
    const todoLength = useSelector(getTodosQtt)

    const isAuth = !!name && !!email

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuth && todoLength === 0) {
            dispatch(todosService())
        }
        else if (isAuth === false && loginModal === false) {
            dispatch(modalActions.toggleLoginModal())
        }

    }, [isAuth, todoLength])


    return (
        <div className={`App ${theme}`}>
            <ModalsToggler />
            <Navbar />
            {isAuth && <Board />}
        </div>
    )
}

export default App