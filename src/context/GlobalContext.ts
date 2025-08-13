import { createContext, JSX } from "react";

type GlobalType = {
    modalConfig: {
        title?: string,
        text?: string,
        html?: JSX.Element | JSX.Element[],
        type?: string,
        callback?: Function,
    },
    modalVisible: boolean,
    setModalVisible: Function,
}

const GlobalContext = createContext({} as GlobalType);

export default GlobalContext;