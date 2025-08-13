import { useContext, useState } from "react";
import Field from "./Field";
import FormContext from "../../context/FormContext";
import monthNames from "../../data/months";
import typeExpenses from "../../data/typeExpense";

type FormType = { type?: string, fn?: string | Function, values?: object, callback?: null | Function}

function Form({ type = 'row', fn = 'add', values = {}, callback = null}: FormType) {
  const addExpensefn = useContext(FormContext);

  const [resetForm, setResetForm] = useState(false);
  const [valorError, setValorError] = useState(false);
  const [dataError, setDataError] = useState(false);
  
  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();

    let objExpense = {};
    
    for (let [key, value] of formData.entries()) {
      objExpense[key] = value;
      if (value === "R$ 0,00") {
        setValorError(true);
        return false;
      }
    }
    
    const date = new Date(`${objExpense['data']}T00:00:00`);
    if (isNaN(date.getTime())) {
      setDataError(true);
      return false;
    }

    const month = date.getMonth().toString();
    const year = date.getFullYear().toString();
    objExpense['month'] = month;
    objExpense['monthName'] = monthNames[month];
    objExpense['year'] = year;
    
    if (valorError) {
      setValorError(false);
    }

    if (dataError) {
      setDataError(false);
    }
    console.log(typeof fn);
    if (fn === 'add' && addExpensefn !== null) {
      addExpensefn(objExpense);
      setResetForm(true);
      e.currentTarget.reset();
      
    } else if (typeof fn === 'function') {
      fn(objExpense);
    }

    callback !== null && callback();
  };

  const currentDate = (function() {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-"+ (day);
  })();

  return (
   <form className={`text-sm flex gap-4 ${type == 'full' && 'flex-col'}`} onSubmit={handleSubmit}>
        <div className="flex-1 min-w-0 relative">
          <Field.Select name="tipo" label='Tipo' required={true} defaultValue={values['tipo']}>
            {Object.keys(typeExpenses).map(function(item) {
              const cObj = typeExpenses[item];
              return (
                <option key={cObj.id} value={cObj.name}>{cObj.name}</option>
              )
            })}
          </Field.Select>
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.Input name="descricao" type="text" label="Descrição" defaultValue={values['descricao']} />
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.InputValor setResetForm={setResetForm} resetForm={resetForm} name="valor" type="text" label="Valor" required={true} newValue={values['valor']} />
          {valorError && <ErrorMsg>Valor precisar ser maior que 0</ErrorMsg>}
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.Input name="data" label="Data" required={true} type="date" defaultValue={values['data'] ? values['data'] : currentDate} />
          {dataError && <ErrorMsg>Data inválida</ErrorMsg>}
        </div>
        <Field.Submit label={fn === 'add' ? 'Adicionar' : 'Editar'} />
    </form>
  )
};

function ErrorMsg({ children }) {
  return (
    <span className={'absolute bg-red-500 text-white px-2 py-1 top-[104%] right-0 text-[10px]'}>{children}</span>
  )
};

export default Form;
