import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { registerUser } from '../_actions/user_action';

const Register = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const onChange = (e) => {
    const {target: {name, value}} = e;
    if(name==='name') return setName(value);
    if(name==='email') return setEmail(value);
    if(name==='pass') return setPassword(value);
    if(name==='confirmPass') return setConfirmPass(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPass) return alert('비밀번호를 정확히 입력해주세요')
    const body = {
      name,
      email,
      password,
    }
    // console.log(body)
    dispatch(registerUser(body))
    .then(res => {
      if(res.payload.ok) {
        history.push('/login');
      }
    })
  }
  
  
  return (
    <main>
      <section id="register">
        <form action="" onSubmit={onSubmit}>

          <label htmlFor="name">이름</label>
          <input name="name" type="text" value={name} onChange={onChange} />

          <label htmlFor="email">이메일</label>
          <input name="email" type="email" value={email} onChange={onChange} />

          <label htmlFor="pass">비밀번호</label>
          <input name="pass" type="password" value={password} onChange={onChange} />

          <label htmlFor="confirmPass">비밀번호 확인</label>
          <input name="confirmPass" type="password" value={confirmPass} onChange={onChange} />

          <button type="submit">회원가입</button>
        </form>
      </section>
    </main>
  )
}

export default Register
