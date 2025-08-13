import { createContext } from "react";
import RemoveType from "../types/RemoveType";

type TableType = {
    editExpenseModal: (expense: object, id: number) => void, 
    removeExpenseModal: ({id, ...rest}: RemoveType) => void
}


const TableContext = createContext({} as TableType);

export default TableContext;