import { memo, useCallback, useState } from 'react';
import cls from './TodoModal.module.scss';
import { useAppDispatch } from '../../../../app/store/store';
import { FaArrowLeft, FaRegEdit } from 'react-icons/fa';

interface TodoModalProps {
    title: string,
    initialValue: string,
    onSave: (value: string, index?: number) => void,
    onClose: () => void,
    buttons: string[]
}

export const TodoModal = memo((props: TodoModalProps) => {
    const { title, initialValue, onSave, onClose, buttons } = props
    const [value, setValue] = useState(initialValue);

    const handleItemValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    console.log("value outside", value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // onSave( value);
        }
    };
    const saveHandle = useCallback((index: number) => {
        console.log("saveHandle", value, index);
        onSave(value, index,)
    }, [value])
    return (
        <div className={cls.TodoModal}>
            <div className={cls.Box}>
                <header>
                    <button onClick={onClose}>
                        <FaArrowLeft size={20} />
                    </button>
                    <h1>{title}</h1>
                    <FaRegEdit size={24} />
                </header>
                <div className={cls.Input}>
                    <input onKeyDown={handleKeyDown} autoFocus type="text" value={value} onChange={handleItemValue} />
                </div>
                <div className={cls.actions}>
                    {buttons.map((button, index) => (
                        <button key={index} onClick={() => saveHandle(index)}>
                            {button}
                        </button>
                    ))}
                </div>
                <footer />
            </div>
        </div>
    );
});