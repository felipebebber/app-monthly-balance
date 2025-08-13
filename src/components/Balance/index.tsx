import List from "./List";
import CalculateExpensesFn from "../../utility/calculateExpense.ts";

function Balance({ list }) {
  const total = CalculateExpensesFn(list);
  
  return (
    <>
      <div className="flex-1 overflow-auto px-0 py-0">
        <List list={list} />
      </div>
      <BalanceTotal total={total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} />
    </>
  )
};

function BalanceTotal({ total }) {
  return (
    <p className="flex justify-between bg-gray-200 text-black py-2 px-4 rounded-b-md">
      <span>Gasto Total</span>
      <span className="font-bold text-blue-600">{total}</span>
    </p>
  )
};

export default Balance;
