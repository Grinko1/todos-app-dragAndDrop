import { memo, useCallback } from 'react';
import { Modal } from '../../../../../shared/ui/Modal/Modal';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { useDispatch } from 'react-redux';
import { LoginData } from '../../../model/types/login';
import { modalActions } from '../../../../../entities/ModalsToggler';
import { signUpService } from '../../../model/service/signUpService';


interface SignUpModalProps {
}

export const SignUpModal = memo((props: SignUpModalProps) => {
    const { } = props

    const dispatch = useDispatch()

    const closeLoginModal = useCallback(() => {
        dispatch(modalActions.toggleSignUpModal())
    }, [])

    const onSave = useCallback(async (data: LoginData) => {
        if (data) {
            console.log(data);

            //@ts-ignore
            const result = await dispatch(signUpService(data))
            if (result.meta.requestStatus === 'fulfilled') {

                closeLoginModal()
            }
        }
    }, [])
    return (
        <Modal isOpen onClose={closeLoginModal}>
            <SignUpForm
                onSave={onSave}
                onClose={closeLoginModal}
            />
        </Modal>
    );
});