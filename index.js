const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('./server/config/key')

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

// app.get('/togedule', (req, res) => res.send('hello'))
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/togedule/users', require('./server/routes/users'))
app.use('/togedule/todos', require('./server/routes/todos'))
app.use('/togedule/schedules', require('./server/routes/schedules'))

const port = 4000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`)
})