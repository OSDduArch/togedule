import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_action'

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e) => {
    const {target: {name, value}} = e;
    if(name==='email') return setEmail(value);
    if(name==='pass') return setPassword(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    }
    // console.log(body)
    dispatch(loginUser(body))
    .then(res => {
      if(res.payload.ok) {
        history.push('/');
      }
    })
  }
  return (
    <main>
      <section id="login">
        <form action="" onSubmit={onSubmit}>
          <label htmlFor="email">이메일</label>
          <input name="email" type="email" value={email} onChange={onChange} />

          <label htmlFor="pass">비밀번호</label>
          <input name="pass" type="password" value={password} onChange={onChange} />

          <button type="submit">로그인</button>
        </form>
      </section>
    </main>
  )
}

export default Login

