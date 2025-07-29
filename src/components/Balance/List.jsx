import { useContext } from "react";
import NewExpenseContext from "../../hooks/NewExpenseContext";

function List() {
    const [expenses, year, month] = useContext(NewExpenseContext);
    console.log(expenses);
    
  return (
    <table className="w-full text-left">
        <Thead items={['Tipo', 'Descrição', 'Valor', 'Data']} />
        {(Object.keys(expenses).length > 0 && typeof expenses[year][month] !== 'undefined') &&  <Tbody list={expenses[year][month]} />}
    </table>
  )
};

function Thead({ items }) {
    const classNameTh = "sticky top-0 p-2 bg-blue-100 font-normal";

  return (
    <thead>
        <tr>
            {items.map(function(item) {
                return <th key={item} className={classNameTh}>{item}</th>
            })}
        </tr>
    </thead>
  )
};

function Tbody({ list }) {
  return (
    <tbody className="border-t-8 border-b-8 border-transparent text-sm">
        {list.map(function(item, i) {
            const { descricao, tipo, valor, data } = item;

            return (
                <tr key={i}>
                    <td className="px-2">{tipo}</td>
                    <td className="px-2">
                        <div className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">
                            {descricao}
                        </div>
                    </td>
                    <td className="px-2">{valor}</td>
                    <td className="px-2">{FormatData(data)}</td>
                </tr>
            )    
        })}
    </tbody>
  )
};

function FormatData(data) {
    let ds = data.split('-');
    let dataToShow = `${ds[2]}/${ds[1]}/${ds[0]}`;
    return dataToShow;
}


export default List;