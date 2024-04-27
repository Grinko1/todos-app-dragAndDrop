import { memo } from 'react';
import cls from './Overlay.module.scss';


interface OverlayProps {
    classNames?: string;
    onClick?: () => void
}

export const Overlay = memo(({ classNames, onClick }: OverlayProps) => {
    return (
        <div className={`${cls.Overlay} ${classNames}`} onClick={onClick} />
    );
});
