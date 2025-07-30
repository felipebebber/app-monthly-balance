import AddExpenses from './components/AddExpenses';
import Chart from './components/Chart';
import Balance from './components/Balance';
import Block from './components/Block';
import { useEffect, useState } from 'react';
import NewExpenseContext from './hooks/NewExpenseContext';
import newExpense from './controller/newExpense';
import removeExpense from './controller/removeExpense';

function App() {
  const date = new Date();

  const [expenseList, setExpenseList] = useState({});
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expense-list');
      const storedYear = localStorage.getItem('expense-year');
      const storedMonth = localStorage.getItem('expense-month');

      const date = new Date();

      if (storedExpenses) {
        setExpenseList(JSON.parse(storedExpenses));

        if (storedMonth) {
          setCurrentMonth(storedMonth);
        } else {
          setCurrentMonth(date.getMonth());
        }

        if (storedYear) {
          setCurrentYear(storedYear);
        } else {
          setCurrentYear(date.getFullYear());
        }
      }

    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(expenseList).length > 0 && typeof expenseList[currentYear][currentMonth] !== 'undefined') {
      setCurrentList(expenseList[currentYear][currentMonth]);
    }
  }, [expenseList]);

  const newExpenseFn = function(expense) {
    const newList = newExpense(expenseList, expense);
    setExpenseList({...newList});
  }
  
  const removeExpenseFn = function(month, year, id) {
    if (window.confirm("Deseja deletar essa dispesa?")) {
      const newList = removeExpense(expenseList, month, year, id);
      setExpenseList({...newList});
    }
  }

  const resetExpenseList = function() {
    if (Object.keys(expenseList).length > 0) {
      localStorage.removeItem('expense-list');
      localStorage.removeItem('expense-month');
      localStorage.removeItem('expense-year');
      setExpenseList({});

      const date = new Date();
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800 h-lvh flex gap-4">
      <div className="grid gap-4 m-auto w-[800px] shadow-sm p-4 rounded-md grid-cols-1 bg-white">
        <div className='text-center'>
          <div className='font-bold text-4xl text-white w-fit m-auto p-2 pt-1 bg-blue-500 uppercase rounded'>Balanço Mensal</div>
          <DateControl dates={{currentMonth, currentYear}} />
        </div>
        <hr className="border-0 border-t border-gray-200 my-2"/>
        <div className='flex flex-col gap-4'>
          <div className="w-full max-w-[800px] mx-auto">
            <NewExpenseContext.Provider value={newExpenseFn}>
              <AddExpenses />
            </NewExpenseContext.Provider>
          </div>

          <div className='flex gap-4 m-auto w-full h-[400px]'>
            <div className="flex-4/12">
              <Block title="Chart" className="h-full px-0 py-0 overflow-hidden">
                <Chart />
              </Block>
            </div>
            <div className="flex-8/12">
              <Block title="Balanço" className="h-full px-0 py-0 overflow-hidden">
                  <NewExpenseContext.Provider value={removeExpenseFn}>
                    <Balance list={currentList} />
                  </NewExpenseContext.Provider>
              </Block>
            </div>
          </div>
          <div className='text-right'>
            <button className='border-red-300 border px-2 py-1 rounded text-sm' onClick={resetExpenseList}>Deletar Storage</button>
          </div>
        </div>
        </div>
    </div>
  )
};


function DateControl({ dates: { currentMonth, currentYear }}) {
  const monthParser = parseInt(currentMonth) + 1;
  return (
    <div className='flex items-center justify-center gap-3'>
      <DateControlBtn>Prev</DateControlBtn>
      <div className='text-2xl border-t-0 text-gray-500 border flex border-blue-200 rounded-b'>
        <div className='capitalize border-r border-blue-200 px-2 py-1'>{monthParser > 9 ? monthParser : "0" + monthParser}</div>
        <div className='px-2 py-1'>{currentYear}</div>
      </div>
      <DateControlBtn>Next</DateControlBtn>
    </div>
  )
};

function DateControlBtn({ children }) {
  return (
    <button className='px-2 py-1 uppercase text-xs bg-gray-200'>{children}</button>
  )
};

export default App;
