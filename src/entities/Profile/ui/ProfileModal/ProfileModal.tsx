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
import { Theme, useTheme } from '../../../../app/theme';

interface ProfileModalProps {
}

export const ProfileModal = memo((props: ProfileModalProps) => {
    const { } = props
    const { email: curEmail, name: curName } = useSelector(getProfile)

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);


    const dispatch = useAppDispatch()

    const closeConfigModal = () => {
        dispatch(modalActions.profileModal())
    }

    const handleNameValue = useCallback((value: string) => {
        setName(value);
        setNameError(null);
    }, [nameError]);

    const handleEmailValue = useCallback((value: string) => {
        setEmail(value);
        setEmailError(null);
    }, []);



    return (
        <Modal isOpen onClose={closeConfigModal}>
            <div className={cls.ProfileModal}>

                <div className={cls.Container}>
                    <header>
                        <button onClick={closeConfigModal}>
                            <FaArrowLeft size={20} />
                        </button>
                        <h1>Профиль</h1>
                        <BsGear size={24} />
                    </header>
                    <div className={cls.Form}>
                        <Input value={name} onChange={handleNameValue} placeholder='name' autofocus error={nameError} />
                        <Input value={email} onChange={handleEmailValue} placeholder='email' autofocus error={emailError} />

                    </div>
                    <div className={cls.Actions}>
                        <button onClick={() => { }}>
                            Сохранить
                        </button>

                    </div>
                    <footer />
                </div>

            </div>
        </Modal>
    );
});