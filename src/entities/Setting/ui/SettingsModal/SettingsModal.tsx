import { memo, useState } from 'react';
import cls from './SettingsModal.module.scss';
import { useSelector } from 'react-redux';
import { getConfig } from '../../model/selectors/getConfig';
import { useAppDispatch } from '../../../../app/store/store';
import { modalActions } from '../../../TodoModal';
import { settingsActions } from '../../model/slices/settingsSlice';
import { FaArrowLeft } from 'react-icons/fa';
import { BsGear } from 'react-icons/bs';
import { Modal } from '../../../../shared/ui/Modal/Modal';

interface SettingsModalProps {
}

export const SettingsModal = memo((props: SettingsModalProps) => {
    const { } = props
    const { background1, background2, glassColor, color, opacity } = useSelector(getConfig)

    const [bg1, setBg1] = useState(background1)
    const [bg2, setBg2] = useState(background2)
    const [gc, setGC] = useState(glassColor)
    const [op, setOp] = useState(opacity)
    const [cl, setCl] = useState(color)

    const dispatch = useAppDispatch()

    const closeConfigModal = () => {
        dispatch(modalActions.configModal())
    }

    const restoreDefault = () => {
        dispatch(settingsActions.save({
            background1: '#00c8ff',
            background2: '#b300ff',
            glassColor: '#000000',
            opacity: '40',
            color: '#ffffff'
        }))
        window.location.reload()
    }

    const saveConfig = () => {
        dispatch(settingsActions.save({
            background1: bg1,
            background2: bg2,
            glassColor: gc,
            opacity: op,
            color: cl
        }))
        window.location.reload()
    }

    return (
        <Modal isOpen onClose={closeConfigModal}>
            <div className={cls.SettingsModal}>

                <div className={cls.Container}>
                    <header>
                        <button onClick={closeConfigModal}>
                            <FaArrowLeft size={20} />
                        </button>
                        <h1>theme config</h1>
                        <BsGear size={24} />
                    </header>
                    <div className={cls.Form}>
                        <div className={cls.Inputs}>
                            <p>background gradient</p>
                            <hr />
                            <div>
                                <p>from</p>
                                <input type="color" value={bg1} onChange={e => setBg1(e.target.value)} />
                            </div>
                            <div>
                                <p>to</p>
                                <input type="color" value={bg2} onChange={e => setBg2(e.target.value)} />
                            </div>
                        </div>
                        <div className={cls.Inputs}>
                            <p>second background</p>
                            <hr />
                            <div>
                                <p>glass</p>
                                <input type="color" accept='rgb' value={gc} onChange={e => setGC(e.target.value)} />
                            </div>
                            <div>
                                <div>
                                    <p>opacity</p>
                                    <p>{op}%</p>
                                </div>
                                <input type="range" value={op} min={0} max={100} onChange={e => setOp(e.target.value)} />
                            </div>
                        </div>
                        <div className={cls.Inputs}>
                            <p>text color</p>
                            <hr />
                            <div>
                                <p>text</p>
                                <input type="color" value={cl} onChange={e => setCl(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className={cls.Actions}>
                        <button onClick={saveConfig}>
                            Save
                        </button>
                        <button onClick={restoreDefault}>
                            default
                        </button>
                    </div>
                    <footer />
                </div>

            </div>
        </Modal>
    );
});