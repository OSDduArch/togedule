import React, { useState, useRef } from 'react'

export default function YearBox({present, setTime}) {

  // const [className, setClass] = useState('')
  const [open, setOpen] = useState(false);

  const yearListRef = useRef(null);
  // const eachYearRef = useRef(null);
  // const boxRef = useRef(null)

  function createYearBox() {
    const years = [];
    for(let i=present.year-10; i<present.year+90; i++){
      years.push(i)
    }
    return years;
  }

  function toggleBox() {
    // setClass(className === 'show' ? '' : 'show');
    setOpen(!open)
    // yearListRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  function setYear(e) {
    const {target: {value}} = e;
    setTime({...present, year: value});
    // setClass('');
  }

  return (
    <div className='option year'  onBlur={()=>{
        // setClass('');
      }}>
      <span onClick={toggleBox}>{present.year}</span>
      <ul className={open ? 'show' : ''} ref={yearListRef}>
        {createYearBox().map((year)=>
          <li key={year} value={year} onClick={setYear}>
            {year}
          </li>
        )}
      </ul>
    </div>
  )
}
