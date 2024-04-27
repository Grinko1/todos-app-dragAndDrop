import { memo, useCallback } from 'react';
import { Modal } from '../../../../../shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { useDispatch } from 'react-redux';

import { LoginData } from '../../../model/types/login';
import { modalActions } from '../../../../../entities/ModalsToggler';


interface LoginModalProps {

}

export const LoginModal = memo((props: LoginModalProps) => {
    const { } = props

    const dispatch = useDispatch()

    const closeLoginModal = useCallback(() => {
        dispatch(modalActions.toggleLoginModal())
    }, [])

    const onSave = useCallback((data: LoginData) => {
        if (data) {
            console.log(data);
            // dispatch(todosActions.addNewTodo({ index, value }))
            closeLoginModal()
        }
    }, [])
    return (
        <Modal isOpen onClose={closeLoginModal}>
            <LoginForm
                title="Аккаунт"

                onSave={onSave}
                onClose={closeLoginModal} />
        </Modal>
    );
});