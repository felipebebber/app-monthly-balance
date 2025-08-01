import setStorage from "../utility/setStorage";

function removeExpense(expenseList, month, year, id) {
    // const expenseYear = {...expenseList[year]};
    let arrayRef = [ ...expenseList[year][month] ];
    arrayRef.splice(id, 1);

    let newList = {};

    if (arrayRef.length === 0) {
        // const { [month]: [], ...rest } = expenseYear;
        const newYearMonths = {};
        const newYear = {};

        for (const [key, value] of Object.entries(expenseList[year])) {
            // console.log(`${key}: ${value}`);
            if (key !== `${month}`) {
                newYearMonths[key] = value;
            }
        }

        if (Object.keys(newYearMonths).length === 0) {
            for (const [key, value] of Object.entries(expenseList)) {   
                if (key !== `${year}`) {
                    newList[key] = value;
                } 
            }
            
        } else {
            newList = {
                ...expenseList,
                [year]: newYearMonths
            };
        }

    } else {
    
        newList = {
            ...expenseList,
            [year]: {
                ...expenseList[year],
                [month]: arrayRef
            }
        }
    }

    setStorage(month, year, newList);
    return newList;
};

export default removeExpense;
