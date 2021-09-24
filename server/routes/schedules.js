const router = require('express').Router();
const { Schedule } = require('../models/Schedule');

router.get('/:id/:year/:month', (req, res) => {
  // console.log(req.params.id)
  // console.log(req.params.time)
  Schedule.find({
    writer: req.params.id, 
    year: req.params.year, 
    month: req.params.month
  }, 
  (err, schedules) => {
    if(err) return res.status(400).json({ ok: false, err });
    return res.status(200).json({ ok: true, schedules })
  })
})

router.get('/:writer/:year/:month/:date', (req, res) => {
  // console.log(req.params.id)
  // console.log(req.params.time)
  Schedule.find({
    writer: req.params.writer, 
    year: req.params.year, 
    month: req.params.month,
    date: req.params.date
  }, 
  (err, schedules) => {
    if(err) return res.status(400).json({ ok: false, err });
    return res.status(200).json({ ok: true, schedules })
  })
})

router.post('/upload', (req, res) => {
  const schedule = new Schedule(req.body);
  schedule.save((err) => {
    if(err) return res.status(400).json({ ok: false, err });
    return res.status(200).json({ ok:true })
  })
})

router.put('/modify', (req, res) => {
  Schedule.findOneAndUpdate({
      writer: req.body.writer,
      year: req.body.year,
      month: req.body.month,
      date: req.body.date,
    },
    {
      schedule: req.body.schedule,
      detail: req.body.detail
    },
    (err) => {
      if(err) return res.status(400).json({ ok: false, err });
      return res.status(200).json({ ok:true })
    })
})

router.delete('/:id', (req, res) => {
  Schedule.findOneAndDelete({_id: req.params.id}, (err) => {
    if(err) return res.status(400).json({ ok: false, err });
    return res.status(200).json({ ok: true })
  })
})

module.exports = router;