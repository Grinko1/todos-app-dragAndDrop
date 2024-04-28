import { memo } from 'react';
import cls from './Input.module.scss';

interface InputProps {
    error: string | null,
    value: string,
    onChange: (value: string) => void,
    autofocus?: boolean,
    type?: string,
    placeholder?: string

}

export const Input = memo((props: InputProps) => {
    const { error, value, onChange, type = 'text', placeholder, autofocus } = props
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={cls.Input}>
            {error && <span className={cls.error}>{error}</span>}
            <input type={type} autoFocus={autofocus} value={value} onChange={handleValueChange} placeholder={placeholder} />

        </div>
    );
});