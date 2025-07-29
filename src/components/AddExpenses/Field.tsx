import { JSX, useState } from "react"

type Input = {
    label: string,
    name: string,
    required?: boolean,
    type?: string,
    value?: string
}

type Select = {
    label: string,
    name: string,
    required?: boolean,
    children: JSX.Element | JSX.Element[]
}

const Field = {
    styling: function(otherClasses = '') {
        return `px-2 py-1.5 border border-gray-400 block min-w-0 rounded-md bg-blue-50 ${otherClasses}`;
    },
    Input: function(props: Input) {
        return (
            <Field.Label label={props.label}>
                <input {...props} className={Field.styling('flex-1')} />
            </Field.Label>
        )
    },
    InputValor: function(props: Input) {
        const [amount, setAmount] = useState('');

        const handleChange = (e) => {
            const raw = e.target.value.replace(/\D/g, '');
            setAmount(raw);
        };

         const formattedAmount = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
        .format(Number(amount) / 100 || 0)
        .replace('\u00A0', ' ');;
        
        return (
            <Field.Label label={props.label}>
                <input {...props} className={Field.styling('flex-1')} value={formattedAmount} onChange={handleChange} />
            </Field.Label>
        )
    },
    Select: function(props: Select, children: JSX.Element[]) {
        return (
            <Field.Label label={props.label}>
                <select defaultValue={''} className={Field.styling('flex-1')} {...props}>
                    <option value="" disabled>Selecione</option>
                    {props.children}
                </select>
            </Field.Label>
        )
    },
    Submit: function({ label }) {
        return <button className={Field.styling()}>{label}</button>
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
