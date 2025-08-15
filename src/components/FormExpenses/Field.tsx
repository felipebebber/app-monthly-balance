import { JSX, useEffect, useState } from "react"

type Input = {
    label: string,
    name: string,
    required?: boolean,
    type?: string,
    value?: string,
    resetForm?: boolean,
    newValue?: string,
    defaultValue?: string,
    setResetForm?: (boolean) => void
}

const Field = {
    styles: function(otherClasses = '') {
        return `px-2 py-1.5 block min-w-0 rounded-md bg-blue-50 hover:bg-blue-100 ${otherClasses}`;
    },
    Input: function(props: Input) {
        return (
            <Field.Label label={props.label}>
                <input {...props} className={Field.styles('flex-1')} />
            </Field.Label>
        )
    },
    Date: function(props: Input) {
        const [dateValue, setDateValue] = useState(props.value);

        function handleValueChange(e) {
            setDateValue(e.currentTarget.value);
        }

        useEffect(() => {
            setDateValue(props.value)
        }, [props.value]);

        return (
            <Field.Label label={props.label}>
                <input {...props} className={Field.styles('flex-1')} value={dateValue} onChange={handleValueChange}  />
            </Field.Label>
        )
    },
    InputValor: function(props: Input) {
        const [amount, setAmount] = useState(props.newValue ? props.newValue.replace(/\D/g, '') : '');

        useEffect(() => {
            if (props.resetForm && props.setResetForm ) {
                props.setResetForm(false);
                setAmount('');
            }
        }, [props.resetForm]);


        useEffect(() => {

        }, []);

        const handleChange = (e) => {
            const raw = e.target.value.replace(/\D/g, '');
            setAmount(raw);
        };

         const formattedAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
        .format(Number(amount) / 100 || 0)
        .replace('\u00A0', ' ');
                
        return (
            <Field.Label label={props.label}>
                <input name={props.name} type={props.type} required={props.required} className={Field.styles('flex-1')} value={formattedAmount} onChange={handleChange} />
            </Field.Label>
        )
    },
    Select: function(props) {
        return (
            <Field.Label label={props.label}>
                <select defaultValue={''} className={Field.styles('flex-1')} {...props}>
                    <option value="" disabled>Selecione</option>
                    {props.children}
                </select>
            </Field.Label>
        )
    },
    Submit: function({ label }) {
        return <button className={Field.styles('bg-blue-100 hover:bg-blue-300 cursor-pointer')}>{label}</button>
    },
    Label: function({ label = '', children }) {
        return (
            <label className="flex items-center gap-1.5">
                <span>{label}</span>
                {children}
            </label>
        )
    }
}

export default Field;
