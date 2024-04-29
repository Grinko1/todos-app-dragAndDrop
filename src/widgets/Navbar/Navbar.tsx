import { memo, useCallback } from 'react';
import cls from './Navbar.module.scss';
import { useAppDispatch } from '../../app/store/store';
import { modalActions } from '../../entities/ModalsToggler';
import { Theme, useTheme } from '../../app/theme';
import { FaMoon, FaRegMoon, FaRegUser } from 'react-icons/fa';

interface NavbarProps {
}

export const Navbar = memo((props: NavbarProps) => {
    const { } = props
    const dispatch = useAppDispatch()
    const { theme, toggleTheme } = useTheme();


    const openNewItemModal = () => {
        console.log("open");
        dispatch(modalActions.newItemModal())
    }
    const openSettingsModal = () => {
        dispatch(modalActions.profileModal())
    }
    const openLoginModal = useCallback(() => {
        dispatch(modalActions.toggleLoginModal())
    }, [])
    return (

        <div className={cls.Navbar}>
            <div className={cls.leftPart}>
                <button onClick={openNewItemModal}>
                    Новая задача
                </button>
            </div>
            <div className={cls.rightPart}>

                <button onClick={openLoginModal}>
                    Войти
                </button>

                <button onClick={openSettingsModal}>
                    <FaRegUser size={24} />
                </button>
                <button onClick={() => toggleTheme()}>
                    {theme === Theme.DARK ? <FaRegMoon size={24} /> : <FaMoon size={24} />}
                </button>
            </div>


        </div>


    );
});