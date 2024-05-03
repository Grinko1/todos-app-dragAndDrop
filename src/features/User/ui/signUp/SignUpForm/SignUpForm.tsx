import { memo, useCallback, useRef, useState } from 'react';
import cls from './SignUpForm.module.scss';
import { SignUpData } from '../../../model/types/login';
import { FaArrowLeft, FaRegEdit } from 'react-icons/fa';
import { Input } from '../../../../../shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { getLoginInfo } from '../../../model/selector/getLoginInfo';
import { useAppDispatch } from '../../../../../app/store/store';
import { loginActions } from '../../../model/slice/loginSlice';

interface SignUpFormProps {
    onSave: (data: SignUpData) => void,
    onClose: () => void,
}

export const SignUpForm = memo((props: SignUpFormProps) => {
    const { onSave, onClose } = props
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");


    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const saveButtonRef = useRef<HTMLButtonElement>(null);
    const { error: fetchError } = useSelector(getLoginInfo)


    const dispatch = useAppDispatch()
    const handleNameValue = useCallback((value: string) => {
        setName(value);
        setNameError(null);
        if (fetchError) {
            dispatch(loginActions.resetError())
        }
    }, [nameError]);

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
    const handleConfirmPasswordValue = useCallback((value: string) => {
        setConfirmPassword(value);
        setConfirmPasswordError(null)
        if (fetchError) {
            dispatch(loginActions.resetError())
        }
    }, []);

    const validate = () => {
        if (!name.trim()) {
            setNameError("Имя обязательно для заполнения");
            return;
        }
        if (!email.trim()) {
            setEmailError("Email обязателен для заполнения");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Неправильный формат почты");
            return;
        }
        if (password.length < 3) {
            setPasswordError("Пароль должен содержать минимум 3 символа");
            return;
        }
        if (confirmPassword.length < 3) {
            setConfirmPasswordError("Пароль должен содержать минимум 3 символа");
            return;
        }
        if (confirmPassword !== password || password.length !== confirmPassword.length) {
            setConfirmPasswordError("Пароли не совпадают");
            return;
        }
        return true
    }
    const saveHandle = useCallback(() => {
        if (validate()) {
            onSave({ name, email, password })
        }
    }, [email, password, name])


    return (
        <div className={cls.SignUpForm}>
            <div className={cls.Box}>
                <header>
                    <button onClick={onClose}>
                        <FaArrowLeft size={20} />
                    </button>
                    <h1>Регистрация</h1>
                    <FaRegEdit size={24} />
                </header>
                <Input error={nameError} placeholder='Имя' value={name} onChange={handleNameValue} autofocus />
                <Input error={emailError} placeholder='Email' value={email} onChange={handleEmailValue} />
                <Input error={passwordError} placeholder='Пароль' value={password} onChange={handlePasswordValue} nextRef={saveButtonRef} />
                <Input error={confirmPasswordError} placeholder='Подтвердите пароль' value={confirmPassword} nextRef={saveButtonRef} onChange={handleConfirmPasswordValue} />
                {fetchError && <span className={cls.fetchError}>{fetchError}</span>}
                <div className={cls.actions}>

                    <button onClick={() => saveHandle()} ref={saveButtonRef}>
                        Войти
                    </button>

                </div>
                <footer />
            </div>
        </div>
    );
});