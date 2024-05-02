import { memo, useCallback } from 'react';
import cls from './Navbar.module.scss';
import { useAppDispatch } from '../../app/store/store';
import { modalActions } from '../../entities/ModalsToggler';
import { Theme, useTheme } from '../../app/theme';
import { FaMoon, FaRegMoon, FaRegUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getProfile } from '../../entities/Profile/model/selectors/getProfile';

interface NavbarProps {
}

export const Navbar = memo((props: NavbarProps) => {
    const { } = props
    const dispatch = useAppDispatch()
    const { theme, toggleTheme } = useTheme();
    const { name } = useSelector(getProfile)



    const openNewItemModal = () => {
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



                {name && <button onClick={openSettingsModal}>
                    <FaRegUser size={24} />
                </button>}
                <button onClick={() => toggleTheme()}>
                    {theme === Theme.DARK ? <FaRegMoon size={24} /> : <FaMoon size={24} />}
                </button>

                {name ? <button onClick={openLoginModal}>
                    Выйти
                </button> :
                    <button onClick={openLoginModal}>
                        Войти
                    </button>
                }
            </div>


        </div>


    );
});