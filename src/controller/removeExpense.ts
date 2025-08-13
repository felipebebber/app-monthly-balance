import setStorage from "../utility/setStorage";

function removeExpense(expenseList, month, year, id) {
    let arrayRef = [ ...expenseList[year][month] ];
    arrayRef.splice(id, 1);
    let currentMonth = month;
    let currentYear = year;

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
            
            const date = new Date();

            if (Object.keys(newList).length === 0) {
                currentMonth = date.getMonth().toString();
                currentYear = date.getFullYear().toString();

            } else {
                const nextYear = Object.keys(newList)[Object.keys(newList).length - 1];
                currentMonth = Object.keys(newList[nextYear])[0];
                currentYear = nextYear;
            }
                        
        } else {
            currentMonth = Object.keys(newYearMonths)[0];

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

    setStorage(currentMonth, currentYear, newList);
    return newList;
};

export default removeExpense;
