import axios from 'axios';
import React from 'react'

const Schedule = ({ schedule, setOpen, setRequestModify, setType }) => {

  const modifySchedule = () => {
    console.log(schedule)
    setOpen(true);
    setType(1);
    setRequestModify({
      schedule: schedule.schedule, 
      detail: schedule.detail
    });
  }
  
  const deleteSchedule = () => {
    if(window.confirm('삭제하시겠습니까?')){
      axios.delete(`/togedule/schedules/${schedule._id}`)
      .then(res => {
        if(res.data.ok) {
          alert('삭제가 완료되었습니다.');
          setOpen(null)
        }
      })
    }
  }
  
  return (
    <li>
      <h3>{schedule.schedule}</h3>
      <p>{schedule.detail}</p>
      <div className="controlBox">
        <button onClick={modifySchedule}>수정</button>
        <button onClick={deleteSchedule}>삭제</button>
      </div>
    </li>
  )
}

export default Schedule
