const router = require('express').Router();
const { Todo } = require('../models/Todo');

router.post('/write', (req, res) => {
  const todo = new Todo(req.body);

  todo.save((err) => {
    if(err) return res.status(400).json({ ok: false, err})
    res.status(200).json({ ok: true })
  })
})

router.get('/read/:id', (req, res) => {
  Todo.find({ writer: req.params.id}, (err, todos) =>{
    if(err) return res.status(400).json({ ok: false, err })
    return res.status(200).json({ ok: true, todos })
  });
})

router.put('/done', (req, res) => {
  Todo.findOneAndUpdate({ _id: req.body._id }, {isDone: req.body.isDone}, (err) => {
    if(err) return res.status(400).json({ ok: false, err});
    return res.status(200).json({ok: true})
  })
})

router.delete('/delete/:id', (req, res) => {
  Todo.findOneAndDelete({_id: req.params.id}, (err) => {
    if(err) return res.status(400).json({ ok: false, err });
    return res.status(200).json({ ok: true })
  })
})

module.exports = router;