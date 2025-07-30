import { useContext } from "react";
import NewExpenseContext from "../../hooks/NewExpenseContext";
import EditIcon from '../../assets/icons/edit.svg?react';
import DeleteIcon from '../../assets/icons/delete.svg?react';
import formatData from "../../utility/formatData";


function List({ list = false }) {
  return (
    <table className="w-full text-left text-sm">
        <Thead items={['Tipo', 'Descrição', 'Valor', 'Data', '']} />
        {list.length > 0 && <Tbody list={list} />}
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
  const classNameTd = "px-2 pb-2";
  const removeExpenseFn = useContext(NewExpenseContext);

  return (
    <tbody className="border-t-8 border-b-8 border-transparent text-sm">
        {list.map(function(item, i) {
          console.log(item);
            const { descricao, tipo, valor, data, month, year } = item;

            return (
                <tr key={i}>
                    <td className={`${classNameTd} first:pl-4`}>{tipo}</td>
                    <td className={`${classNameTd}`}>
                        <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                            {descricao}
                        </div>
                    </td>
                    <td className={`${classNameTd}`}>{valor}</td>
                    <td className={`${classNameTd}`}>{formatData(data)}</td>
                    <td className={`${classNameTd}`}>
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 cursor-pointer"><EditIcon /></button>
                        <button className="p-1 text-gray-400 cursor-pointer" onClick={() => removeExpenseFn(month, year, i)}><DeleteIcon /></button>
                      </div>
                    </td>
                </tr>
            )    
        })}
    </tbody>
  )
};

export default List;