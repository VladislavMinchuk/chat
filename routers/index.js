const express = require('express');
const router = express.Router();
const User = require('../models/user');
const HttpError = require('../error');
const ObjectID = require('mongodb').ObjectID;

router.get('/session', (req, res) => {
  req.session.visits = req.session.visits + 1 || 1;
  res.send(`Visits ${req.session.visits}`);
});

router.get('/users', (req, res, nest) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/users/:id', (req, res, next) => {
  try {
    const id = new ObjectID(req.params.id);
  } catch (err) {
    next(new HttpError(404, 'have no ID'));
  }

  User.find({ id: id })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
});

// catch 404 and forward to error handler
router.get('*', function(req, res, next) {
  next(new HttpError(404));
});

// error handler
router.use((err, req, res, next) => {
  res.send(err);
});

module.exports = router;
