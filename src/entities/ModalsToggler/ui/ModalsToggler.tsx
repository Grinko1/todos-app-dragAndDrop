import { memo } from 'react';
import { EditTodoModal, NewTodoModal } from '../../TodoModal';
import { ProfileModal } from '../../Profile/ui/ProfileModal/ProfileModal';
import { LoginModal, SignUpModal } from '../../../features/User';
import { useSelector } from 'react-redux';
import { getModals } from '../model/selectors/getModals';



export const ModalsToggler = memo(() => {
    const { editTodoModal, newTodoModal, profileModal, loginModal, signUpModal } = useSelector(getModals)
    return (
        <>
            {editTodoModal && <EditTodoModal />}
            {newTodoModal && <NewTodoModal />}
            {profileModal && <ProfileModal />}
            {loginModal && <LoginModal />}
            {signUpModal && <SignUpModal />}
        </>
    );
});