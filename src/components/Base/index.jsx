import { useEffect, useReducer, useState, useMemo, useCallback } from 'react';

import STORAGE_KEYS from '../../utility/storageKeys';

import Block from '../Block';
import Modal from '../Modal';
import FormExpenses from '../FormExpenses';
import Chart from '../Chart';
import Balance from '../Balance';
import FormEdit from '../FormExpenses/Form';
import DateControlWrapper from './DateController';

import ExpenseContext from '../../context/ExpenseContext';
import GlobalContext from '../../context/GlobalContext';

import ExpensesReducer from '../../hooks/useExpensesReducer';

const initialValue = {}

function Base() {
    const date = new Date();

    const [currentMonth, setCurrentMonth] = useState(date.getMonth().toString());
    const [currentYear, setCurrentYear] = useState(date.getFullYear().toString());
    const [expenses, updateExpenses] = useReducer(ExpensesReducer, initialValue);
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
                setCurrentMonth(storedMonth);
                setCurrentYear(storedYear);
            }
            
        } catch (error) {
            console.error('Failed to load expenses:', error);
        }
    }, []);

    useEffect(() => {
        const storedYear = localStorage.getItem(STORAGE_KEYS.YEAR);
        const storedMonth = localStorage.getItem(STORAGE_KEYS.MONTH);

        if (storedMonth && storedMonth !== currentMonth) {
            setCurrentMonth(storedMonth);
        }
        
        if (storedYear && storedYear !== currentYear) {
            setCurrentYear(storedYear);
        }
        
    }, [expenses]);

    const currentList = useMemo(() => {
        return expenses?.[currentYear]?.[currentMonth] || [];
    }, [expenses, currentYear, currentMonth]);
    
    const addExpensefn = useCallback(
        (expense) => updateExpenses({ type: 'add', expense }),
        [updateExpenses]
    );

    const editExpenseFn = useCallback(
        (expense, id) => updateExpenses({ type: 'edit', expense, id }),
        [updateExpenses]
    );

    const removeExpenseFn = useCallback(
        ({ month, year, id }) => updateExpenses({ type: 'remove', month, year, id }),
        [updateExpenses]
    );

    const removeExpenseModal = useCallback(
        ({ id, ...rest }) => {
            if (!Number.isInteger(id)) return;
            setModalConfig({
            type: 'confirm',
            text: <b>Deseja remover despesa {id}?</b>,
                callback: () => removeExpenseFn({ id, ...rest })
            });
        },
        [removeExpenseFn]
    );
    
    const editExpenseModal = useCallback(
        function(expense, id) {
            setModalConfig({
                title: `Edição de despesa ${id}`,
                html: <FormEdit type="full" fn={(expenseSave) => editExpenseFn(expenseSave, id)} values={expense} key={`${expense.month}${expense.year}${id}`} callback={() =>  setModalVisible(false)}/>
            });
        },
        [editExpenseFn, setModalVisible]
    )
    
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
                    <div>
                        <div className='font-bold text-center text-4xl text-white w-fit m-auto p-2 pt-1 pb-1 bg-blue-600 uppercase rounded'>Balanço Mensal</div>
                        <DateControlWrapper values={{expenses, currentMonth, currentYear, setCurrentMonth, setCurrentYear}} />
                    </div>
                    <hr className="border-0 border-t border-gray-200 my-2"/>
                    <div className='flex flex-col gap-4'>
                        <div className="w-full max-w-[800px] mx-auto">
                            <ExpenseContext.Provider value={addExpensefn}>
                                <FormExpenses />
                            </ExpenseContext.Provider>
                        </div>
                        <div className='flex gap-4 m-auto w-full h-[400px]'>
                            <div className="flex-4/12">
                                <Block title="Chart" className="h-full">
                                    <Chart list={currentList} />
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
                        <div className='text-right'>
                            <button className='border-red-300 border px-2 py-1 rounded text-sm' onClick={() => setModalConfig({
                                type: 'confirm',
                                text: <b>Deseja deletar todas despesas?</b>,
                                callback: resetExpenseList
                            })}>Deletar Storage</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal modalConfig={modalConfig} />
        </GlobalContext.Provider>
    )
};


export default Base;
    