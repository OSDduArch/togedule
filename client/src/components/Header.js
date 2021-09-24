import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../components/Logout';
import styles from '../style/Header.module.css';

export default function Header() {
  
  const user = useSelector(state => state.user);
  // console.log(user.userData)
  return (
    <header id={styles.header}>
      <h1><Link to="/">TOGEDULE</Link></h1>
      <nav>
        <ul>
          <li><NavLink to="/todos" activeClassName={styles.active}>todo</NavLink></li>
          <li><NavLink to="/schedule" activeClassName={styles.active}>Schedule</NavLink></li>
          {
            user.userData && user.userData.isAuth ? 
              <li><Logout /></li> 
            :
              <li><NavLink to="/login" activeClassName={styles.active}>Login</NavLink></li> }
        </ul>
      </nav>
    </header>
  )
}
