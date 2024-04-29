import { memo, useCallback, useState } from 'react';
import cls from './ProfileModal.module.scss';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../../../app/store/store';
import { FaArrowLeft, FaMoon, FaRegMoon } from 'react-icons/fa';
import { BsGear } from 'react-icons/bs';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { modalActions } from '../../../ModalsToggler';
import { Input } from '../../../../shared/ui/Input/Input';
import { getProfile } from '../../model/selectors/getProfile';


interface ProfileModalProps {
}

export const ProfileModal = memo((props: ProfileModalProps) => {
    const { } = props
    const { email: curEmail, name: curName } = useSelector(getProfile)

    const [name, setName] = useState<string>(curEmail);
    const [email, setEmail] = useState<string>(curName);


    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);


    const dispatch = useAppDispatch()

    const closeProfileModal = () => {
        dispatch(modalActions.profileModal())
    }

    const validateData = () => {
        if (!name.trim()) {
            setNameError("Имя обязательно для заполнения")
            return
        }
        if (name.length < 2) {
            setNameError("Имя должно содержать минимум 2 буквы")
            return
        }
        if (!email.trim()) {
            setEmailError("Почта обязатльна для заполнения")
            return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Неправильный формат почты");
            return;
        }
        return true;
    }

    const handleNameValue = useCallback((value: string) => {
        setName(value);
        setNameError(null);
    }, [nameError]);

    const handleEmailValue = useCallback((value: string) => {
        setEmail(value);
        setEmailError(null);
    }, []);

    const handleUpdateProfile = useCallback(() => {
        if (validateData()) {
            console.log("data for update profile:", { name, email });
            closeProfileModal()
        }


    }, [name, email])


    return (
        <Modal isOpen onClose={closeProfileModal}>
            <div className={cls.ProfileModal}>

                <div className={cls.Container}>
                    <header>
                        <button onClick={closeProfileModal}>
                            <FaArrowLeft size={20} />
                        </button>
                        <h1>Профиль</h1>
                        <BsGear size={24} />
                    </header>
                    <div className={cls.Form}>
                        <Input value={name} onChange={handleNameValue} placeholder='name' autofocus error={nameError} />
                        <Input value={email} onChange={handleEmailValue} placeholder='email' error={emailError} />

                    </div>
                    <div className={cls.Actions}>
                        <button onClick={handleUpdateProfile}>
                            Сохранить
                        </button>

                    </div>
                    <footer />
                </div>

            </div>
        </Modal>
    );
});