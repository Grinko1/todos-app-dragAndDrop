import { memo } from 'react';
import cls from './Navbar.module.scss';
import { useAppDispatch } from '../../app/store/store';
import { modalActions } from '../../entities/TodoModal';

interface NavbarProps {
}

export const Navbar = memo((props: NavbarProps) => {
    const { } = props
    const dispatch = useAppDispatch()


    const openNewItemModal = () => {
        console.log("open");
        dispatch(modalActions.newItemModal())
    }
    return (
        <div className={cls.Navbar}>
            <button onClick={openNewItemModal}>
                <p>new item</p>
            </button>
        </div>
    );
});