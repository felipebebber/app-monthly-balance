const setStorage = function(month, year, list) {
   localStorage.setItem('expense-month', month);
   localStorage.setItem('expense-year', year);
   localStorage.setItem('expense-list', JSON.stringify(list));
 }

export default setStorage;
