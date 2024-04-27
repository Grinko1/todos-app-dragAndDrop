import { memo } from 'react';
import cls from './Navbar.module.scss';
import { useAppDispatch } from '../../app/store/store';
import { modalActions } from '../../entities/TodoModal';
import { BsGear } from 'react-icons/bs';

interface NavbarProps {
}

export const Navbar = memo((props: NavbarProps) => {
    const { } = props
    const dispatch = useAppDispatch()


    const openNewItemModal = () => {
        console.log("open");
        dispatch(modalActions.newItemModal())
    }
    const opneSettingsModal = () => {
        dispatch(modalActions.configModal())
    }
    return (
        <div className={cls.Navbar}>
            <div className={cls.leftPart}>
                <button onClick={openNewItemModal}>
                    Новая задача
                </button>
            </div>
            <div className={cls.rightPart}>
                <button onClick={opneSettingsModal}>
                    Войти
                </button>
                <button onClick={opneSettingsModal}>
                    <BsGear size={24} />
                </button>
            </div>


        </div>
    );
});