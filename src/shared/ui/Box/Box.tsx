import { ReactNode, memo } from 'react';
import cls from './Box.module.scss';

interface BoxProps {
    children: ReactNode
}

export const Box = memo((props: BoxProps) => {
    const { children } = props
    return (
        <div className={cls.Box}>
            {children}
        </div>
    );
});