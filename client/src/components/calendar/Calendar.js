import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import YearOption from './YearOption';
import MonthOption from './MonthOption';
import Mission from './Mission';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useSelector } from 'react-redux';


export default function Calendar() {

  const user = useSelector(state => state.user);
  const [present, setTime] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1,
  })
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if(user.userData && user.userData.isAuth) {
      axios.get(`togedule/schedules/${user.userData._id}/${present.year}/${present.month}`)
      .then(res => {
        if(res.data.ok) {
          setSchedules(res.data.schedules)
        }
      })
    }
    
  }, [user, present])

  const renderDate= (year, month) => {
    //월별 일자
    const dateInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //1주를 5줄 만들어주기
    const block = new Array(35);
    //배열마다 빈 칸 만들기
    for(let i=0; i<block.length; i++) {
      block.splice(i, 1, <li key={i+1}></li>)
    }
    // block.fill(<li></li>);
    //월별 1일의 요일을 구해 시작점으로 잡는다.
    let start = new Date(year, month-1, 1).getDay();
    //윤년 계산
    if(year % 4 === 0 && year % 100 !== 0){
      dateInMonth[1] = 29;
    } else if (year % 400 === 0) {
      dateInMonth[1] = 29;
    }
    //시작점에서 마지막 일자까지 일자를 채운다
    for(let i=0; i<dateInMonth[month-1];i++){
      block.splice(start, 1, 
        <li key={start + 1}>
          <div className='dateWrap'>
            <span>{i+1}</span>
            <Link className='link' 
              to={`/detail/${present.year}/${present.month}/${i+1}`}>
              +
            </Link>
          </div>
          <Mission schedules={schedules} date={i+1} ></Mission>
        </li>)
      start++
    }
    return block;
  }

  const nextMonth = () => {
    setSchedules([])
    if(present.month === 12) return setTime({year: present.year + 1, month: 1})
    setTime({
      ...present,
      month: present.month + 1
    })
  }
    
  const previousMonth = () => {
    setSchedules([])
    if(present.month === 1) return setTime({ year: present.year - 1, month: 12});
    setTime({
      ...present, 
      month: present.month-1
    });
  }
  

  return (
    <>
      <div className="calendar-console">
        <button onClick={previousMonth}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>

        <YearOption present={present} setTime={setTime} />

        <MonthOption present={present} setTime={setTime} />

        <button onClick={nextMonth}>
          <FontAwesomeIcon icon={faChevronRight}/>
        </button>
      </div>
      <div className="dateArea">
        <ul className='dateList'>
          <li className='day'>Sun</li>
          <li className='day'>Mon</li>
          <li className='day'>Tue</li>
          <li className='day'>Wed</li>
          <li className='day'>Thu</li>
          <li className='day'>Fri</li>
          <li className='day'>Sat</li>
          {
            renderDate(present.year, present.month)
          }
        </ul>
      </div>
    </>
  );
}
