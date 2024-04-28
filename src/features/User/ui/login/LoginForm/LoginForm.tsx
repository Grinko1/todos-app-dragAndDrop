import { memo, useCallback, useState } from 'react';
import cls from './LoginForm.module.scss';
import { FaArrowLeft, FaRegEdit, FaRegUser } from 'react-icons/fa';
import { LoginData } from '../../../model/types/login';
import { useAppDispatch } from '../../../../../app/store/store';
import { modalActions } from '../../../../../entities/ModalsToggler';


interface LoginFormProps {
    onSave: (data: LoginData) => void,
    onClose: () => void,

}

export const LoginForm = memo((props: LoginFormProps) => {
    const { onSave, onClose } = props
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(null);
    };
    const handlePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(null)
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveHandle()
        }
    };
    const saveHandle = useCallback(() => {
        // todo validate
        if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
            return;
        }
        if (password.length < 3) {
            setPasswordError("Password must be at least 3 characters long");
            return;
        }

        onSave({ email, password })
        setPassword("")
        setEmail("")
    }, [email, password])
    const openSignUpModal = useCallback(() => {
        onClose()
        dispatch(modalActions.toggleSignUpModal())

    }, [])
    return (
        <div className={cls.LoginForm}>
            <div className={cls.Box}>
                <header>
                    <button onClick={onClose}>
                        <FaArrowLeft size={20} />
                    </button>
                    <h1>Авторизация</h1>
                    <FaRegUser size={24} />
                </header>
                <div className={cls.Input}>
                    {emailError && <span className={cls.error}>{emailError}</span>}
                    <input onKeyDown={handleKeyDown} autoFocus type="text" value={email} onChange={handleEmailValue} placeholder='email' />

                </div>
                <div className={cls.Input}>
                    {passwordError && <span className={cls.error}>{passwordError}</span>}
                    <input onKeyDown={handleKeyDown} type="text" value={password} onChange={handlePasswordValue} placeholder='password' />

                </div>
                <div className={cls.actions}>

                    <button onClick={() => saveHandle()}>
                        Войти
                    </button>
                    <button className={cls.signUpBtn} onClick={openSignUpModal}>нет аккаунта</button>

                </div>

                <footer />
            </div>
        </div>
    );
});