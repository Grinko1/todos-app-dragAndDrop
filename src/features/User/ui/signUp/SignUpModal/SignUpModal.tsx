import { memo, useCallback } from 'react';
import { Modal } from '../../../../../shared/ui/Modal/Modal';
import { SignUpForm } from '../SignUpForm/SignUpForm';
import { useDispatch } from 'react-redux';
import { LoginData } from '../../../model/types/login';
import { modalActions } from '../../../../../entities/ModalsToggler';


interface SignUpModalProps {
}

export const SignUpModal = memo((props: SignUpModalProps) => {
    const { } = props

    const dispatch = useDispatch()

    const closeLoginModal = useCallback(() => {
        dispatch(modalActions.toggleSignUpModal())
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
            <SignUpForm
                onSave={onSave}
                onClose={closeLoginModal}
            />
        </Modal>
    );
});