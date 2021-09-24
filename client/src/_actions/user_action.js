import axios from 'axios';

export const registerUser = (data) => {
  const req = axios.post('/togedule/users/register', data)
    .then(res => res.data)

    return {
      type: "REGISTER_USER",
      payload: req
    }
}

export const loginUser = (data) => {
  const req = axios.post('/togedule/users/login', data)
  .then(res => res.data)

  return {
    type: "LOGIN_USER",
    payload: req
  }
}

export const logoutUser = () => {
  const req = axios.get('/togedule/users/logout')
  .then(res => res.data)

  return {
    type: 'LOGOUT_USER',
    payload: req,
  }
} 

export const auth =  () => {
  const req =  axios.get('/togedule/users/auth')
  .then(res => res.data)

  return {
    type: "AUTH_USER",
    payload: req
  }
}