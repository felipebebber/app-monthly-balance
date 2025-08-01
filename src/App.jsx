import { useEffect, useReducer, useState } from 'react';
import Expenses from './components/Expenses';
import Chart from './components/Chart';
import Balance from './components/Balance';
import Block from './components/Block';
import NewExpenseContext from './hooks/NewExpenseContext';
import Modal from './components/Modal';
import FormEdit from './components/Expenses/Form';

import addExpense from './controller/addExpense';
import removeExpense from './controller/removeExpense';
import editExpense from './controller/editExpense';
import GlobalContext from './hooks/GlobalContext';

const initialValue = {}

function ExpensesReducer(state, action) {
  switch (action.type) {
    case 'set': {
      return action.expenses
    };
    case 'add': {
      return addExpense(state, action.expense);
    };
    case 'edit': {
      return editExpense(state, action.expense, action.id);
    };
    case 'remove': {
      return removeExpense(state, action.month, action.year, action.id);
    };
    default:
      break;
  }
}

function App() {
  const date = new Date();
  const [expenses, updateExpenses] = useReducer(ExpensesReducer, initialValue);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [currentList, setCurrentList] = useState([]);
  const [modalConfig, setModalConfig] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('expense-list');
      const storedYear = localStorage.getItem('expense-year');
      const storedMonth = localStorage.getItem('expense-month');

      const date = new Date();

      if (storedExpenses) {
        updateExpenses({type: 'set', expenses: JSON.parse(storedExpenses)});

        if (storedMonth) {
          // setCurrentMonth(storedMonth);
          setCurrentMonth(date.getMonth());
        } else {
          setCurrentMonth(date.getMonth());
        }

        if (storedYear) {
          // setCurrentYear(storedYear);
          setCurrentYear(date.getFullYear());
        } else {
          setCurrentYear(date.getFullYear());
        }
      }

    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(expenses).length > 0 && typeof expenses[currentYear] !== 'undefined') {
      if (typeof expenses[currentYear][currentMonth] !== 'undefined') {
        setCurrentList(expenses[currentYear][currentMonth]);
      }
    }
  }, [expenses]);

  const addExpensefn = (expense) => updateExpenses({type: 'add', expense: expense});

  const removeExpenseFn = function({month, year, id}) {
    // setModalConfig({
    //   type: 'confirm',
    //   title: `Deseja remover Despesa [${id}] ?`,
    //   callback: function() {
    //   }
    // });
    updateExpenses({type: 'remove', month, year, id})
  }
  
  const editExpenseFn = function(expense, id) {
    setModalConfig({
      title: `Edição de Despesa [${id}]`,
      html: <FormEdit type="full" fn={(expense) => updateExpenses({type: 'edit', expense, id})} values={expense} key={`${expense.month}${expense.year}${id}`} callback={() =>  setModalVisible(false)}/>
    });
  }

  const resetExpenseList = function() {
    if (Object.keys(expenses).length > 0) {
      localStorage.removeItem('expense-list');
      localStorage.removeItem('expense-month');
      localStorage.removeItem('expense-year');
      updateExpenses({type: 'set', expenses: {}});

      const date = new Date();
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }

  return (
    <GlobalContext.Provider value={{setModalVisible, modalVisible, modalConfig}}>
    <div className="bg-gray-50 text-gray-800 h-lvh flex gap-4">
      <div className="grid gap-4 m-auto w-[800px] shadow-sm p-4 rounded-md grid-cols-1 bg-white">
        <div className='text-center'>
          <div className='font-bold text-4xl text-white w-fit m-auto p-2 pt-1 bg-blue-500 uppercase rounded'>Balanço Mensal</div>
          <DateControl dates={{currentMonth, currentYear}} />
        </div>
        <hr className="border-0 border-t border-gray-200 my-2"/>
        <div className='flex flex-col gap-4'>
          <div className="w-full max-w-[800px] mx-auto">
            <NewExpenseContext.Provider value={addExpensefn}>
              <Expenses />
            </NewExpenseContext.Provider>
          </div>

          <div className='flex gap-4 m-auto w-full h-[400px]'>
            <div className="flex-4/12">
              <Block title="Chart" className="h-full">
                <Chart />
              </Block>
            </div>
            <div className="flex-8/12">
              <Block title="Balanço" className="h-full">
                  <NewExpenseContext.Provider value={{editExpenseFn, removeExpenseFn}}>
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
    <Modal modalConfig={modalConfig} />
    </GlobalContext.Provider>
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
