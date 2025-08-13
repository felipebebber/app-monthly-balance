import { useEffect, useContext } from "react";
import Block from "../Block";
// @ts-expect-error
import CloseIcon from "../../assets/icons/close.svg?react";
import GlobalContext from '../../context/GlobalContext';
import Confirm from "./Confirm";
import Body from "./Body";

function Modal() {
    const {modalConfig, modalVisible, setModalVisible} = useContext(GlobalContext);

    function close(e) {
        if (e.target.classList.contains('jsCloseModal')) {
            setModalVisible(false);
        }
    }

    useEffect(() => {
        if (Object.keys(modalConfig).length > 0) {
            setModalVisible(true)
        }
    }, [modalConfig]);

    const ModalCloseBtn = function() {
        return <button className="jsCloseModal" onClick={() => {setModalVisible(false)}}><CloseIcon /></button>
    }

    return (
        <div className={`jsCloseModal fixed z-10 w-full h-full top-0 bottom-0 bg-white/50 text-black transition-all flex ${modalVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={close}
        >
            <Block className="m-auto bg-white shadow-sm w-[400px] relative" title={modalConfig.title} HeaderBtn={ModalCloseBtn}>
                <div className="p-6">
                    {modalConfig.text && <Body><p>{modalConfig.text}</p></Body>}
                    {modalConfig.html && modalConfig.html }
                    {(modalConfig.type && modalConfig.type === 'confirm') && <Confirm callback1={modalConfig.callback} callback2={setModalVisible} />}
                </div>
            </Block>
        </div>
    )
};

export default Modal;
