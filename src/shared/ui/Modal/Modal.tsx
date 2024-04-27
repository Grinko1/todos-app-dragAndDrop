import { ReactNode } from 'react';
;
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '../../../app/theme';
import { useModal } from '../../hooks/useModal';
import { Portal } from '../Portal/Portal';


interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;
    const { theme } = useTheme();

    const { isClosing, isMounted, close } = useModal({
        onClose,
        isOpen,
        animationDelay: ANIMATION_DELAY,
    });


    const modalClassNames = () => {
        const classNames = [cls.Modal, theme, cls.app_modal, cls.modalNew];

        if (isOpen) {
            classNames.push(cls.opened);
        }
        if (isClosing) {
            classNames.push(cls.isClosing);
        }

        return classNames.join(' ');
    };

    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal>
            <div
                className={modalClassNames()}>
                <Overlay onClick={close} classNames={cls.overlay} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
