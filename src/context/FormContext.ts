import { createContext } from "react";

type FormContext = {
    addExpensefn: Function,
    currentMonth: string,
    currentYear: string
}

const FormContext = createContext({} as FormContext);

export default FormContext;