import setStorage from "../utility/setStorage";

const newExpense = function(expenseList, expense) {
    const currentObj = expense;
    const { year, month } = currentObj;

    expenseList[year] ||= {};
    expenseList[year][month] ||= [];
    expenseList[year][month].unshift(expense);
    
    setStorage(month, year, expenseList);
    return expenseList;
}

export default newExpense;