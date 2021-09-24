import React, { useEffect, useState } from 'react'

const Mission = ({ schedules, date}) => {

  const renderMission= () => {
    
    const list = [];
    const listLength = 3;

    for(let i=0;i<schedules.length;i++) {
      
      if(schedules[i].date === date){ 
        list.push(<li key={i+1}>{schedules[i].schedule}</li>)
        if(list.length===listLength) return list
      }
    }
    return list;
  }

  return (
    <ul className='missionList'>
      {renderMission()}
      
    </ul>
  )
}

export default Mission;