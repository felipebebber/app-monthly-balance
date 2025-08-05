import setStorage from "../utility/setStorage";

function removeExpense(expenseList, month, year, id) {
    let arrayRef = [ ...expenseList[year][month] ];
    arrayRef.splice(id, 1);

    let newList = {};

    if (arrayRef.length === 0) {
        const newYearMonths = {};

        for (const [key, value] of Object.entries(expenseList[year])) {
            if (key !== `${month}`) {
                newYearMonths[key] = value;
            }
        }
        
        if (Object.keys(newYearMonths).length === 0) {
            for (const [key, value] of Object.entries(expenseList)) {   
                if (key !== `${year}`) {
                    newList = {
                        [key]: value
                    }
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
