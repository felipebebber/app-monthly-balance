import setStorage from "../utility/setStorage";

const editExpense = function(expenseList, expense, id) {
    const currentObj = expense;
    const { year, month } = currentObj;

    expenseList[year] ||= {};
    expenseList[year][month] ||= [];
    expenseList[year][month][id] = expense;
        
    setStorage(month, year, expenseList);
    return expenseList;
}

export default editExpense;