import AddExpenses from './components/AddExpenses';
import Chart from './components/Chart';
import Balance from './components/Balance';
import Block from './components/Block';
import { useEffect, useState } from 'react';
import NewExpenseContext from './hooks/NewExpenseContext';
import monthNames from './utility/months';

function App() {
  const [expenseList, setExpenseList] = useState({});
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

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
          setCurrentMonth(monthNames[date.getMonth()]);
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

  const changeExpenseList = function(expense) {
    const currentObj = expense;
    const { year, monthName } = currentObj;

    expenseList[year] ||= {};
    expenseList[year][monthName] ||= [];
    expenseList[year][monthName].unshift(expense);
    
    localStorage.setItem('expense-month', monthName);
    localStorage.setItem('expense-year', year);
    localStorage.setItem('expense-list', JSON.stringify(expenseList));
    setExpenseList({...expenseList});
  }

  const resetExpenseList = function() {
    if (Object.keys(expenseList).length > 0) {
      localStorage.removeItem('expense-list');
      localStorage.removeItem('expense-month');
      localStorage.removeItem('expense-year');
      setExpenseList({});

      const date = new Date();
      setCurrentMonth(monthNames[date.getMonth()]);
      setCurrentYear(date.getFullYear());
    }
  }

  return (
    <div className="bg-gray-50 text-gray-800 h-lvh flex gap-4">
      <div className="grid gap-8 m-auto w-[800px]">
        <div className='text-center font-bold text-4xl text-blue-500 uppercase'>
          Balanço Mensal
        </div>
        <div className='flex flex-col gap-4'>
          <div className="w-full max-w-[800px] mx-auto">
            <NewExpenseContext.Provider value={changeExpenseList}>
              <AddExpenses />
            </NewExpenseContext.Provider>
          </div>

          <div className='flex gap-4 m-auto w-full h-[400px]'>
            <div className="flex-4/12">
              <Block className="h-full">
                <Chart />
              </Block>
            </div>
            <div className="flex-8/12">
              <Block className="h-full">
                  <NewExpenseContext.Provider value={[expenseList, currentYear, currentMonth]}>
                    <Balance />
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

export default App;
