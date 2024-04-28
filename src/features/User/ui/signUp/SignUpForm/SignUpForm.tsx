import { memo, useCallback, useState } from 'react';
import cls from './SignUpForm.module.scss';
import { LoginData } from '../../../model/types/login';
import { FaArrowLeft, FaRegEdit } from 'react-icons/fa';
import { Input } from '../../../../../shared/ui/Input/Input';

interface SignUpFormProps {
    onSave: (data: LoginData) => void,
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

    console.log({ email, name, password, confirmPassword });

    console.log(nameError, confirmPasswordError, passwordError);

    const handleNameValue = useCallback((value: string) => {
        setName(value);
        setNameError(null);
    }, []);

    const handleEmailValue = useCallback((value: string) => {
        setEmail(value);
        setEmailError(null);
    }, []);
    const handlePasswordValue = useCallback((value: string) => {
        setPassword(value);
        setPasswordError(null)
    }, []);
    const handleConfirmPasswordValue = useCallback((value: string) => {
        setConfirmPassword(value);
        setConfirmPasswordError(null)
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveHandle()
        }
    };
    const saveHandle = useCallback(() => {
        if (!name.trim()) {
            setNameError("Name is required");
            return;
        }
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
        if (confirmPassword.length < 3) {
            setConfirmPasswordError("Password must be at least 3 characters long");
            return;
        }
        if (confirmPassword !== password || password.length !== confirmPassword.length) {
            setConfirmPasswordError("Пароли не совпадают");
            return;
        }

        onSave({ email, password })
        setPassword("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }, [email, password])
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
                <Input error={nameError} placeholder='Имя' value={name} onChange={handleNameValue} autofocus={true} />
                <Input error={emailError} placeholder='email' value={email} onChange={handleEmailValue} />
                <Input error={passwordError} placeholder='Пароль' value={password} onChange={handlePasswordValue} />
                <Input error={confirmPasswordError} placeholder='Подтвердите пароль' value={confirmPassword} onChange={handleConfirmPasswordValue} />

                <div className={cls.actions}>

                    <button onClick={() => saveHandle()}>
                        Войти
                    </button>

                </div>
                <footer />
            </div>
        </div>
    );
});