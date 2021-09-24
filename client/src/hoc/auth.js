import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute=null) {
  
  function AuthenticationCheck(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    // console.log(props)
    useEffect(() => {
      dispatch(auth())
      .then(res => {
        if(!res.payload.isAuth) {
          if(option) {
            alert('로그인이 필요한 서비스입니다')
            history.push('/login')
          }
        } else {
          if(adminRoute && !res.payload.isAdmin) {
            history.push('/');
          } else if (option === false) {
            history.push('/')
          }
        }
      })
    }, [])
    return (<SpecificComponent />)
  }
  
  return AuthenticationCheck
}
