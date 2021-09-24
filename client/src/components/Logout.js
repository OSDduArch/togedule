import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { logoutUser } from '../_actions/user_action';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = () => {
    dispatch(logoutUser());
    alert('로그아웃 되었습니다.')
    history.push('/')
  }
  
  return (
    <a 
      onClick={onClick}
      style={{
        cursor: 'pointer',
      }}
    >
      Logout
    </a>
  )
}

export default Logout
