import { memo, useCallback } from 'react';
import cls from './Navbar.module.scss';
import { useAppDispatch } from '../../app/store/store';
import { BsGear } from 'react-icons/bs';
import { LoginModal } from '../../features/User/ui/login/LoginModal/LoginModal';
import { modalActions } from '../../entities/ModalsToggler';

interface NavbarProps {
}

export const Navbar = memo((props: NavbarProps) => {
    const { } = props
    const dispatch = useAppDispatch()



    const openNewItemModal = () => {
        console.log("open");
        dispatch(modalActions.newItemModal())
    }
    const openSettingsModal = () => {
        dispatch(modalActions.configModal())
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
                    <BsGear size={24} />
                </button>
            </div>


        </div>


    );
});