import { memo, useCallback } from 'react';
import { Modal } from '../../../../../shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { useDispatch } from 'react-redux';

import { LoginData } from '../../../model/types/login';
import { modalActions } from '../../../../../entities/ModalsToggler';
import { loginService } from '../../../model/service/loginService';
import { loginActions } from '../../../model/slice/loginSlice';


interface LoginModalProps {

}

export const LoginModal = memo((props: LoginModalProps) => {
    const { } = props

    const dispatch = useDispatch()

    const closeLoginModal = useCallback(() => {
        dispatch(modalActions.toggleLoginModal())
    }, [])

    const onSave = useCallback(async (data: LoginData) => {
        if (data) {
            console.log("login data", data);
            //@ts-ignore
            const result = await dispatch(loginService(data))
            if (result.meta.requestStatus === 'fulfilled') {

                closeLoginModal()
            }

        }
    }, [])
    return (
        <Modal isOpen onClose={closeLoginModal}>
            <LoginForm
                onSave={onSave}
                onClose={closeLoginModal} />
        </Modal>
    );
});