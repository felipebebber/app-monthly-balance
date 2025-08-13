import setStorage from "../utility/setStorage";

const addExpense = function(expenseList, expense) {
    const { year, month } = expense;

    let monthArray = [];
    if (typeof expenseList[year] !== "undefined") {
        if (typeof expenseList[year][month] !== "undefined") {
            monthArray = expenseList[year][month];
        }
    }

    const newList = {
        ...expenseList,
        [year]: {
            ...expenseList[year],
            [month]: [
                expense,
                ...monthArray,
            ]
        }
    };

    setStorage(month, year, newList);
    return newList;
}

export default addExpense;