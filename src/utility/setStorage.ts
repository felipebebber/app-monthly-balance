import STORAGE_KEYS from './storageKeys';

const setStorage = function(month, year, list) {
  if (Object.keys(list).length > 0) {
    localStorage.setItem(STORAGE_KEYS.MONTH, month);
    localStorage.setItem(STORAGE_KEYS.YEAR, year);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(list));
  } else {
    localStorage.removeItem(STORAGE_KEYS.MONTH);
    localStorage.removeItem(STORAGE_KEYS.YEAR);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
  }
 }

export default setStorage;
