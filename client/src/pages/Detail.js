import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ModalWindow from '../components/detail/ModalWindow';
import Schedule from '../components/detail/Schedule';
import '../style/Detail.css'

const Detail = () => {

  const present = useParams();
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const [requestModify, setRequestModify] = useState({schedule: '', detail: ''})
  const [submitType, setType] = useState(0); //0이라면 플러스, 1이라면 수정
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    if(user.userData && user.userData.isAuth){
      axios.get(`/togedule/schedules/${user.userData._id}/${present.year}/${present.month}/${present.date}`)
      .then(res => {
        if(res.data.ok){
          setSchedules(res.data.schedules);
        }
      })
    }
  }, [user, open])
  
  const openModal = () => {
    setType(0);
    setRequestModify({schedule: '', detail: ''})
    setOpen(!open)
  }
  console.log(open)
  return (
    <main>
      <section id="inputBox" className={open ? 'open' : ''} >
        <ModalWindow 
          user={user}
          present={present}
          setOpen={setOpen} 
          requestModify={requestModify}
          setRequestModify={setRequestModify}
          submitType={submitType}
          setType={setType}
        />
      </section>
       <section id='detail'>
        <h2>
          <div className="addScheduleBtn" onClick={openModal}></div>
          <span>{present.year}</span><br />
          {
            present.month < 10 ? `0${present.month}` : present.month
            }.{
            present.date < 10 ? `0${present.date}` : present.date
          } 일정
        </h2>
        <div className='schedule-list'>
          <ul>
            {schedules.map(schedule => 
              <Schedule 
                key={schedule._id} 
                schedule={schedule}
                open={open}
                setOpen={setOpen}
                setRequestModify={setRequestModify}
                setType={setType}
              />
              )}
          </ul>
        </div>
      </section>
    </main>

  )
    }
//     <main>
//       {/* <ModalWindow /> */}

//       <section id='detail'>
//         <h2>
//           <div className="addScheduleBtn" onClick={()=>{
//             setType(0);
//             setWindow('open');
//           }}></div>
//           <span>{present.year}</span><br />
//           {
//             present.month < 10 ? `0${present.month}` : present.month
//             }.{
//             present.date < 10 ? `0${present.date}` : present.date
//           } 일정
//         </h2>
        
//         <div className='schedule-list'>
//           <ul>
//             {data.map((all)=>
//               <li key={all.id}>
//                 <h3>{all.schedule}</h3>
//                 <p>{all.detail}</p>
//                 <div className="controlBox">
//                   <button value={all.id} onClick={(e)=>{
//                     setReadyRev(e, all.schedule, all.detail);
//                   }}>수정</button>
//                   <button value={all.id} 
//                   onClick={()=>{
//                     scheduleDel(all.id)
//                   }}
//                   >삭제</button>
//                 </div>
//               </li>
//             )}
//           </ul>
//         </div>
//       </section>
//     </main>

export default Detail
