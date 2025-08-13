import addExpense from '../controller/addExpense';
import removeExpense from '../controller/removeExpense';
import editExpense from '../controller/editExpense';

function ExpensesReducer(state, action) {
  switch (action.type) {
    case 'set': {
      return action.expenses
    };
    case 'add': {
      return addExpense(state, action.expense);
    };
    case 'edit': {
      return editExpense(state, action.expense, action.id);
    };
    case 'remove': {
      return removeExpense(state, action.month, action.year, action.id);
    };
    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

export default ExpensesReducer;