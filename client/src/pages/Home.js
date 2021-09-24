import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../style/Home.module.css';

const Home = () => {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    setTime();
    const timeInteval = setInterval(()=>{
      setTime();
    }, 500)

    return () => clearInterval(timeInteval)
  }, []);
  
  const setTime = () => {
    const day = new Date();
    setHours(day.getHours());
    setMinutes(day.getMinutes());
    setSecond(day.getSeconds());
  }
  
  return (
    <main>
      <section id={styles.home}>
        <h2>
          {
            hours<10 ? `0${hours}`: `${hours}`
          } : {
            minutes<10 ? `0${minutes}`: `${minutes}`
          } 
        </h2>
        {
          user.userData && !user.userData.isAuth &&
          <Link to='/register'>처음 방문하셨나요?</Link>
        }
      </section>
    </main>
  )
}

export default Home;