import { useEffect, useState } from "react";
import Block from "../Block/";
import CloseIcon from "../../assets/icons/close.svg?react";

function Modal({ modalConfig, setModalVisible, modalVisible }) {
    const [visible, setVisible] = useState(modalVisible ? modalVisible : false);

    function close(e) {
        if (e.target.classList.contains('jsCloseModal')) {
            setModalVisible(false);
        }
    }

    useEffect(() => {
        if (modalVisible) {
            setVisible(modalVisible);
        } else {
            setVisible(false);
        }
    }, [modalVisible]);

    const Modal = function() {
        return <button className="jsCloseModal" onClick={() => {setVisible(false)}}><CloseIcon /></button>        
    }
    
    return (
        <div className={`jsCloseModal fixed z-10 w-full h-full top-0 bottom-0 bg-white/50 text-black transition-all flex ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            onClick={close}
        >
            <Block className="m-auto bg-white shadow-sm w-[400px] relative" title={modalConfig.title} Modal={Modal}>
                <div className="px-4 py-2">
                    {modalConfig.text && <p>{modalConfig.text}</p>}
                    {modalConfig.html && modalConfig.html}
                </div>
            </Block>
        </div>
    )
};

export default Modal;
