import React from 'react';
import '../style/Schedule.css';
import Calendar from '../components/calendar/Calendar';

const Schedule = () => {
  
  return (
    <main>
      <section id="schedule">
        <div className='container'>
          <Calendar></Calendar>
        </div>
      </section>
    </main>
  )
}

export default Schedule;