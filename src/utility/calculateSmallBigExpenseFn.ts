import typeExpenses from "../data/typeExpense";

function calculateSmallBigExpenseFn(expenses) {
    const countRefObj: {tipo: string, total: number}[] = [];

    Object.keys(typeExpenses).map(function(item) {
        let currentTotal = 0;
        const tipo = typeExpenses[item].name;

        expenses.map(function(expense) {
            if (expense.tipo === tipo) {
                const valorAtual = parseFloat(expense.valor.replaceAll('R$ ', '').replaceAll('.', '').replaceAll(',', '.'));
                currentTotal += valorAtual;
            }
        });

        if (currentTotal !== 0) {
            countRefObj.push({
                tipo: tipo,
                total: currentTotal
            });
        }
    });

    if (countRefObj.length > 0) {
        const max = countRefObj.reduce(function(prev, current) {
            return (prev && prev.total > current.total) ? prev : current
        });
        
        const min = countRefObj.reduce(function(prev, current) {
            return (prev && prev.total < current.total) ? prev : current
        });
    
        return { small: min, big: max };
    }

}

export default calculateSmallBigExpenseFn;