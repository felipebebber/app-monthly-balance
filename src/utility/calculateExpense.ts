function calculateExpensesFn(expenses) {
    const initialValue = 0;
    const sumExpenses = expenses.reduce(
        (accumulator, currentValue) => {
            const valorAtual = currentValue.valor.replaceAll('R$ ', '').replaceAll('.', '').replaceAll(',', '.');
            return accumulator + parseFloat(valorAtual);
        },
        initialValue,
    );
    return sumExpenses;
}

export default calculateExpensesFn;