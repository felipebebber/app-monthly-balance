const setStorage = function(month, year, list) {
  if (Object.keys(list).length > 0) {
    localStorage.setItem('expense-month', month);
    localStorage.setItem('expense-year', year);
    localStorage.setItem('expense-list', JSON.stringify(list));
  } else {
    localStorage.removeItem('expense-month');
    localStorage.removeItem('expense-year');
    localStorage.removeItem('expense-list');
  }
 }

export default setStorage;
