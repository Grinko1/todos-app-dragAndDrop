import { memo } from 'react';
import cls from './NewTodoModal.module.scss';

interface NewTodoModalProps {
}

export const NewTodoModal = memo((props: NewTodoModalProps) => {
    const { } = props
    return (
        <div className={cls.NewTodoModal}>
        </div>
    );
});