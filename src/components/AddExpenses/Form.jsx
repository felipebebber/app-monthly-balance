import { useForm } from "react-hook-form"
import { useContext } from "react";
import Field from "./Field";
import NewExpenseContext from "../../hooks/NewExpenseContext";
import monthNames from "../../utility/months";

function Form() {
  const changeExpenseList = useContext(NewExpenseContext);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const date = new Date(data.data);
    const month = date.getMonth();
    const year = date.getFullYear();
    data.month = month;
    data.monthName = monthNames[month];
    data.year = year;

    changeExpenseList(data);
  };

  const currentDate = (function() {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    return now.getFullYear() + "-" + (month) + "-"+ (day);
  })();

  const refErrorsFields = {
    required: "Campo obrigatório!",
  }

  const refErrosClasses = "absolute bg-red-500 text-white px-2 py-1 top-[104%] right-0 text-[10px]";

  return (
   <form className="text-sm flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-1 min-w-0 relative">
          <Field.Select name="tipo" label='Tipo' {...register("tipo", { required: refErrorsFields['required'] })}>
            <option value="Comida">Comida</option>
            <option value="Saúde">Saúde</option>
            <option value="Diversão">Diversão</option>
            <option value="Casa">Casa</option>
          </Field.Select>
          {errors.tipo && <span className={refErrosClasses}>{errors.tipo.message}</span>}
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.Input name="descricao" label="Descrição" {...register("descricao")} />
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.InputValor name="valor" label="Valor" {...register("valor", { required: refErrorsFields['required'], validate: (val) => {
            if (val == 'R$ 0,00') {
              return 'Valor precisa ser acima de 0.';
            }
            return true;
          } })} />
          {errors.valor && <span className={refErrosClasses}>{errors.valor.message}</span>}
        </div>
        <div className="flex-1 min-w-0 relative">
          <Field.Input name="data" label="Data" {...register("data", { required: refErrorsFields['required'] })} type="date" defaultValue={currentDate} />
          {errors.data && <span className={refErrosClasses}>{errors.data.message}</span>}
        </div>
        <Field.Submit label="Adicionar" {...register("Adicionar")} />
    </form>
  )
};

export default Form;
