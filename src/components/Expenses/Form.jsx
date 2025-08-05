import { useContext, useState } from "react";
import Field from "./Field";
import ExpenseContext from "../../context/ExpenseContext";
import monthNames from "../../data/months";
import typeExpenses from "../../data/typeExpense";

function Form({ type = 'row', fn = 'add', values = {}, callback = null}) {
  const addExpensefn = useContext(ExpenseContext);

  const [resetForm, setResetForm] = useState(false);
  const [valorError, setValorError] = useState(false);
  
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
    
    const date = new Date(`${objExpense.data}T00:00:00`);
    const month = date.getMonth();
    const year = date.getFullYear();
    objExpense.month = month;
    objExpense.monthName = monthNames[month];
    objExpense.year = year;

    if (valorError) {
      setValorError(false);
    }
    
    if (fn === 'add') {
      addExpensefn(objExpense);
      setResetForm(true);
      e.currentTarget.reset();
      
    } else {
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
          <Field.Select name="tipo" label='Tipo' required={true} defaultValue={values.tipo}>
            {typeExpenses.map(function(item) {
              return (
                <option key={item.id} value={item.id}>{item.value}</option>
              )
            })}
          </Field.Select>
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.Input name="descricao" type="text" label="Descrição" defaultValue={values.descricao} />
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.InputValor setResetForm={setResetForm} resetForm={resetForm} name="valor" type="text" label="Valor" required={true} newValue={values.valor} />
          {valorError && <ErrorMsg>Valor precisar ser maior que 0</ErrorMsg>}
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.Input name="data" label="Data" required={true} type="date" defaultValue={values.data ? values.data : currentDate} />
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
