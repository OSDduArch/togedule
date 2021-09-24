import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ModalWindow = ({ user, present, setOpen, requestModify, submitType, setType }) => {

  const [schedule, setSchedule] = useState('');
  const [detail, setDetail] = useState('');
  useEffect(() => {
    setSchedule(requestModify.schedule)
    setDetail(requestModify.detail)
  }, [requestModify])

  const onChange = (e) => {
    const {target : { name, value }} = e;
    if(name === 'schedule') return setSchedule(value);
    if(name === 'detail') return setDetail(value);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      writer: user.userData._id,
      schedule,
      detail,
      year: present.year,
      month: present.month,
      date: present.date
    }
    if(submitType === 0){
      axios.post('/togedule/schedules/upload', body)
      .then(res => {
        if(res.data.ok) {
          alert('일정 등록이 완료되었습니다.')
          setSchedule('');
          setDetail('');
          setOpen(false);
        }
      })
    } else {
      axios.put('/togedule/schedules/modify', body)
      .then(res => {
        if(res.data.ok) {
          alert('일정 등록이 완료되었습니다.')
          setSchedule('');
          setDetail('');
          setOpen(false);
        }
      })
  
      
    }
  }

  return (
    <form action="" onSubmit={onSubmit}>
      
      <div className="closeBtn" onClick={()=>{setOpen(false)}}></div>

      <label htmlFor="schedule" >일정</label>
      <input name="schedule" id="schedule" value={schedule} onChange={onChange} />

      <label htmlFor="detail">세부사항</label>
      <textarea name="detail" id="detail" value={detail} onChange={onChange} ></textarea>

      <button>저장하기</button>
    </form>
  )
}

export default ModalWindow
