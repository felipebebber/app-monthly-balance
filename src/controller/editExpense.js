import setStorage from "../utility/setStorage";

const editExpense = function(expenseList, expense, id) {
    const { year, month } = expense;

    let monthArray = expenseList[year][month];
    monthArray[id] = expense;

    const newList = {
        ...expenseList,
        [year]: {
            ...expenseList[year],
            [month]: monthArray
        }
    };

    setStorage(month, year, newList);
    return newList;
}

export default editExpense;