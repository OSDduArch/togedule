const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = mongoose.Schema({
  todo: String,
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isDone: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model('Todo', todoSchema);
module.exports = { Todo };