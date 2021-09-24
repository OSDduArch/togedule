const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { auth } = require('../middleware/auth')

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    // image: req.user.image
  })
})

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err) => {
    if(err) return res.status(400).json({ ok: false, err});
    res.status(200).json({ ok: true });
  })
})

router.post('/login', (req, res) =>  {

  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        ok: false,
        msg: '일치하는 유저가 없습니다.'
      })
    }

    user.comparePass(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({
        ok: false,
        msg: '비밀번호가 일치하지 않습니다.'
      })
      user.createToken((err, user) => {
        if(err) return res.status(400).json({ ok: false, err })
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ok: true, userId: user._id})
      })
    })
  })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id }, { token: ''},
  (err, user) => {
    if(err) return res.json({ ok: false, err });
    return res.status(200).json({ ok: true, isAuth: false })
  })
})

module.exports = router;