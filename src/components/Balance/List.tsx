import { useContext } from "react";
import ExpenseContext from "../../context/TableContext";
// @ts-expect-error
import EditIcon from '../../assets/icons/edit.svg?react';
// @ts-expect-error
import DeleteIcon from '../../assets/icons/delete.svg?react';
import formatData from "../../utility/formatData";
import typeExpenses from "../../data/typeExpense";
import slugify from "../../utility/slugify";

function List({ list = false }: { list: boolean | []}) {
  return (
    <table className="w-full text-left text-sm">
        <Thead items={['Tipo', 'Descrição', 'Valor', 'Data', '']} />
        {(typeof list === 'object' && list.length > 0) && <Tbody list={list} />}
    </table>
  )
};

function Thead({ items }) {
    const classNameTh = "first:pl-4 sticky top-0 p-2 bg-blue-100";

  return (
    <thead className="uppercase text-xs">
        <tr>
            {items.map(function(item) {
                return <th key={item} className={classNameTh}>{item}</th>
            })}
        </tr>
    </thead>
  )
};

function Tbody({ list }) {
  const classNameTd = "px-2 py-1";
  const { removeExpenseModal, editExpenseModal } = useContext(ExpenseContext);

  return (
    <tbody className="text-sm">
        {list.map(function(item, i) {
          // console.log(item);
            const { descricao, tipo, valor, data, month, year } = item;
            const infoUpdateExpense = { month, year, id: i };
            return (
                <tr key={i} className="border-b border-b-gray-200">
                    <td className={`${classNameTd} first:pl-4 border-l-2 ${typeExpenses[slugify(tipo)].borderColor}`}>{tipo}</td>
                    <td className={`${classNameTd}`}>
                        <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                            {descricao}
                        </div>
                    </td>
                    <td className={`${classNameTd}`}>{valor}</td>
                    <td className={`${classNameTd}`}>{formatData(data)}</td>
                    <td className={`${classNameTd}`}>
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 cursor-pointer" onClick={() => editExpenseModal(item, i)}><EditIcon /></button>
                        <button className="p-1 text-gray-400 cursor-pointer" onClick={() => removeExpenseModal(infoUpdateExpense)}><DeleteIcon /></button>
                      </div>
                    </td>
                </tr>
            )    
        })}
    </tbody>
  )
};

export default List;