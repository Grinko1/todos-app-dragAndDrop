

import { ReactNode, memo } from 'react';
import cls from './Contrainer.module.scss';


interface ContrainerProps {
    children?: ReactNode
}

export const Contrainer = memo((props: ContrainerProps) => {
    const { children } = props;

    return (
        <div className={cls.Contrainer}>
            {children}
        </div>
    );
});