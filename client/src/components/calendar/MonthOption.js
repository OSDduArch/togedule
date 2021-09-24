import React, {useState} from 'react'

const MonthOption = ({ present, setTime }) => {

  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [open, setOpen] = useState(false);

  const setMonth = (e) => {
    const { target: {value}} = e;
    setTime({
      ...present,
      month: value
    });
    setOpen(!open)
  }
  
  const toggleBox = () => {
    setOpen(!open);
  }
  
  return (
    <div className="option month">
      <span onClick={toggleBox}>{present.month}</span>
      <ul className={open ? 'show' : ''}>
        {monthList.map((month) => 
          <li key={month} value={month} onClick={setMonth}>
            {month}
          </li>
        )}
      </ul>
    </div>
  )
}

export default MonthOption
