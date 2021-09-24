const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String
  }
},
{timestamps: true}
);

userSchema.pre('save', function(next) {
  const user = this;
  if(user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if(err) next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }
})

userSchema.methods.comparePass = function(plainPass, cb) {
  bcrypt.compare(plainPass, this.password, (err, result) => {
    if(!result) return cb(err);
    return cb(null, result);
  });
}

userSchema.methods.createToken = function(cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'access');

  user.token = token;
  user.save((err, user) => {
    if(err) return cb(err);
    return cb(null, user);
  })
}

userSchema.statics.findByToken = function(token, cb) {
  const user =  this;

  jwt.verify(token, 'access', function(err, decoded) {
    user.findOne({_id: decoded, token: token}, (err, user) => {
      if(err) return cb(err);
      return cb(null, user);
    })
  });
}

const User = mongoose.model('User', userSchema);
module.exports = { User };