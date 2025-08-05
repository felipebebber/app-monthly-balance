import { useEffect, useReducer, useState, useMemo } from 'react';
import Expenses from './components/Expenses';
import Chart from './components/Chart';
import Balance from './components/Balance';
import Block from './components/Block';
import ExpenseContext from './context/ExpenseContext';
import Modal from './components/Modal';
import FormEdit from './components/Expenses/Form';
import STORAGE_KEYS from './utility/storageKeys';
import GlobalContext from './context/GlobalContext';
import ExpensesReducer from './hooks/useExpensesReducer';

const initialValue = {}

function App() {
  const date = new Date();
  const [expenses, updateExpenses] = useReducer(ExpensesReducer, initialValue);
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [modalConfig, setModalConfig] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      const storedYear = localStorage.getItem(STORAGE_KEYS.YEAR);
      const storedMonth = localStorage.getItem(STORAGE_KEYS.MONTH);

      if (storedExpenses) {
        updateExpenses({type: 'set', expenses: JSON.parse(storedExpenses)});
      }

      if (storedMonth && storedYear) {
        setCurrentMonth(parseInt(storedMonth));
        setCurrentYear(parseInt(storedYear));
      }

    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  }, []);

  const currentList = useMemo(() => {
    return expenses?.[currentYear]?.[currentMonth] || [];
  }, [expenses, currentYear, currentMonth]);

  const addExpensefn = (expense) => updateExpenses({type: 'add', expense: expense});
  const editExpenseFn = (expense, id) => updateExpenses({type: 'edit', expense, id});
  const removeExpenseFn = ({month, year, id}) => updateExpenses({type: 'remove', month, year, id});

  const removeExpenseModal = ({ id, ...rest }) => {
    if (!id) return;
    setModalConfig({
      type: 'confirm',
      text: <b>Deseja remover despesa {id}?</b>,
      callback: () => removeExpenseFn({ id, ...rest })
    });
  };

  const editExpenseModal = function(expense, id) {
    setModalConfig({
      title: `Edição de despesa ${id}`,
      html: <FormEdit type="full" fn={(expenseSave) => editExpenseFn(expenseSave, id)} values={expense} key={`${expense.month}${expense.year}${id}`} callback={() =>  setModalVisible(false)}/>
    });
  }
  
  const resetExpenseList = function() {
    if (Object.keys(expenses).length > 0) {
      localStorage.removeItem(STORAGE_KEYS.EXPENSES);
      localStorage.removeItem(STORAGE_KEYS.YEAR);
      localStorage.removeItem(STORAGE_KEYS.MONTH);
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
            <DateControlWrapper dates={{currentMonth, currentYear}} />
          </div>
          <hr className="border-0 border-t border-gray-200 my-2"/>
          <div className='flex flex-col gap-4'>
            <div className="w-full max-w-[800px] mx-auto">
              <ExpenseContext.Provider value={addExpensefn}>
                <Expenses />
              </ExpenseContext.Provider>
            </div>
            <div className='flex gap-4 m-auto w-full h-[400px]'>
              <div className="flex-4/12">
                <Block title="Chart" className="h-full">
                  <Chart />
                </Block>
              </div>
              <div className="flex-8/12">
                <Block title="Balanço" className="h-full">
                    <ExpenseContext.Provider value={{editExpenseModal, removeExpenseModal}}>
                      <Balance list={currentList} />
                    </ExpenseContext.Provider>
                </Block>
              </div>
            </div>
            <DeleteStorage fn={resetExpenseList} />
          </div>
        </div>
      </div>
      <Modal modalConfig={modalConfig} />
    </GlobalContext.Provider>
  )
};


function DateControlWrapper({ dates: { currentMonth, currentYear }}) {
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


function DeleteStorage({ fn }) {
  return (
    <div className='text-right'>
        <button className='border-red-300 border px-2 py-1 rounded text-sm' onClick={fn}>Deletar Storage</button>
      </div>
  )
};


export default App;
