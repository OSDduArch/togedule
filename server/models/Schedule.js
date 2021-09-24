const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = mongoose.Schema({
  schedule: String,
  detail: String,
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  year: Number,
  month: Number,
  date: Number
})

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = { Schedule };