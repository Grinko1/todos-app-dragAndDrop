import { memo, useCallback, useRef, useState } from 'react';
import cls from './LoginForm.module.scss';
import { FaArrowLeft, FaRegUser } from 'react-icons/fa';
import { LoginData } from '../../../model/types/login';
import { useAppDispatch } from '../../../../../app/store/store';
import { modalActions } from '../../../../../entities/ModalsToggler';
import { Input } from '../../../../../shared/ui/Input/Input';
import { getLoginInfo } from '../../../model/selector/getLoginInfo';
import { useSelector } from 'react-redux';
import { loginActions } from '../../../model/slice/loginSlice';


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
    const saveButtonRef = useRef<HTMLButtonElement>(null);
    const { error: fetchError } = useSelector(getLoginInfo)


    const handleEmailValue = useCallback((value: string) => {
        setEmail(value);
        setEmailError(null);
        if (fetchError) {
            dispatch(loginActions.resetError())
        }

    }, []);
    const handlePasswordValue = useCallback((value: string) => {
        setPassword(value);
        setPasswordError(null)
        if (fetchError) {
            dispatch(loginActions.resetError())
        }
    }, []);


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
                <Input error={emailError} autofocus value={email} onChange={handleEmailValue} placeholder='email' />
                <Input error={passwordError} value={password} onChange={handlePasswordValue} placeholder='Пароль' nextRef={saveButtonRef} />
                {fetchError && <span className={cls.fetchError}>{fetchError}</span>}
                <div className={cls.actions}>

                    <button onClick={() => saveHandle()} ref={saveButtonRef}>
                        Войти
                    </button>
                    <button className={cls.signUpBtn} onClick={openSignUpModal}>нет аккаунта</button>

                </div>

                <footer />
            </div>
        </div>
    );
});