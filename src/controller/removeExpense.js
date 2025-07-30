import setStorage from "../utility/setStorage";

function removeExpense(expenseList, month, year, id) {
    // let listRef = expenseList;
    let arrayRef = expenseList[year][month];
    arrayRef.splice(id, 1);
    if (arrayRef.length === 0) {
        // listRef[year];
        // arrayRef
        const { [month]: [], ...rest } = expenseList[year];
        console.log(rest);

        setStorage(month, year, rest);
        return rest;
    }

    setStorage(month, year, expenseList);
    return expenseList;

};

export default removeExpense;
