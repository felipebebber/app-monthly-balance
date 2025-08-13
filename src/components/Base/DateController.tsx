import { useState, useCallback, useEffect } from "react";

function DateControlWrapper({values: {expenses, currentMonth, currentYear, setCurrentYear, setCurrentMonth}}) {
  const [selectMonthOptions, setSelectMonthOptions] = useState([currentMonth]);
  const [selectYearOptions, setSelectYearOptions] = useState([currentYear]);

  useEffect(() => {
    if (Object.keys(expenses).length > 0) {
      const years: string[] = [];
      const months: string[] = [];

      if (typeof expenses[currentYear] !== 'undefined') {
        console.log(currentMonth);
        console.log(currentYear);
        
        for (const [key] of Object.entries(expenses)) {
          years.push(key);
        }
        
        for (const [key] of Object.entries(expenses[currentYear])) {
          months.push(key);
        }
      }

      if (years.length > 0) setSelectYearOptions(years);
      if (months.length > 0) setSelectMonthOptions(months);
    }
  }, [expenses, currentMonth, currentYear]);

  const handleChangeYear = function(e) {
    const changedYear = e.currentTarget.value;

    if (typeof expenses[changedYear][currentMonth] === 'undefined') {
      setCurrentMonth(Object.keys(expenses[changedYear])[0])
    }
    setCurrentYear(e.currentTarget.value);
  };
  
  const handleChangeMonth = useCallback(function(e) {
    const changedMonth = e.currentTarget.value;
    setCurrentMonth(changedMonth);
  }, [])
  
  return (
    <div className='flex items-center justify-center gap-3'>
      <div className='text-2xl border-t-0 text-gray-500 border flex border-blue-200 rounded-b'>
        <div className='capitalize border-r border-blue-200 px-2 py-1 min-w-[66px]'>
              <select value={currentMonth} onChange={handleChangeMonth}>
                {selectMonthOptions && selectMonthOptions.map(function(item, i) {
                  const month = parseInt(item);
                  const monthParsed = month + 1;
                  const monthFinal = monthParsed > 9 ? monthParsed : "0" + monthParsed;
                  return (
                    <option key={`${i}-${month}-${currentYear}`} value={month}>{monthFinal}</option>
                  )
                })}
              </select>
          </div>
        <div className='px-2 py-1 min-w-[92px]'>
          <select value={currentYear} onChange={handleChangeYear}>
            {selectYearOptions && selectYearOptions.map(function(year, i) {
              return (
                <option key={`${i}-${year}`} value={year}>{year}</option>
              )
            })}
          </select>
        </div>
      </div>
    </div>
  )
};

export default DateControlWrapper;