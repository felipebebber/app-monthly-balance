import List from "./List";
import calculateExpensesFn from "../../utility/calculateExpense.ts";
import calculateSmallBigExpenseFn from "../../utility/calculateSmallBigExpenseFn.ts";
import { useState } from "react";

function Balance({ list }) {
  const total = calculateExpensesFn(list);
  const ExpenseSmallBig = calculateSmallBigExpenseFn(list);
  const totalItems = list.length;
  
  return (
    <>
      <div className="flex-1 overflow-auto px-0 py-0">
        <List list={list} />
      </div>
      <BalanceTotal total={total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} ExpenseSmallBig={ExpenseSmallBig} totalItems={totalItems} />
    </>
  )
};

function BalanceTotal({ total, totalItems, ExpenseSmallBig }) {
  const [infoOpen, setInfoOpen] = useState(false);

  const totalBig = ExpenseSmallBig ? ExpenseSmallBig.big : {};
  const totalSmall = ExpenseSmallBig ? ExpenseSmallBig.small : {};

  return (
    <div className="flex justify-between bg-gray-200 text-black py-2 px-4 rounded-b-md text-sm font-medium">
      <span>Gasto Total</span>
      <span className="ml-auto relative text-right">
        <span className={`font-bold text-blue-600 ${totalItems !== 0 ? 'mr-7' : ''}`}>
          {total} ({totalItems === 1 ? totalItems + ' item' : totalItems + ' itens'})
        </span>
        {totalItems !== 0 &&
        <details onClick={(e: any) => {
          e.preventDefault()
        }} className="ml-2 text-left" {...infoOpen ?{open: true}: {}}>
          <summary className="absolute top-[1px] right-1 list-none rounded-md bg-blue-500 text-white w-[17px] h-[17px] flex items-center justify-center cursor-pointer" onClick={() => setInfoOpen(!infoOpen)}>{ infoOpen ? '-' : '+'}</summary>
          <table className="mt-1">
            <tbody>
              <ItemGasto title="Maior gasto (acc)" expense={totalBig} color="text-red-500"/>
              {(totalSmall.tipo !== totalBig.tipo && totalSmall.total !== 0 && totalItems > 1) &&
                <ItemGasto title="Menor gasto (acc)" expense={totalSmall} color="text-blue-500"/>
              }
            </tbody>
          </table>
        </details>
        }
      </span>
    </div>
  )
};

function ItemGasto({ title, expense, color }) {
  return (
    <tr>
      <td className="px-1 py-0 uppercase text-xs text-gray-500 text-right">{title}</td>
      <td className="px-1 py-0 border border-r border-gray-400">{expense.tipo}</td>
      <td className="px-1 py-0 border border-gray-400"><span className={color}>{expense.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></td>
    </tr>
  )
};


export default Balance;