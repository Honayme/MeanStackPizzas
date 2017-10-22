'use strict';

// TODO: Make Doc

// Get schemas
const pizzaSchema = require('../Model/pizzaSchema');

// Get modules
const express = require('express');
const router  = express.Router();
const ServerEvent = require('./ServerEvent');
// const request = require('request');


// -------------------------------------------------------------------------- //
//                                Router                                      //
// -------------------------------------------------------------------------- //

// Get all pizza order by update_at desc
router.get('/', (req, res, next) => {
  getAllPizza(req, res, next);
});

// Get a specific pizza from name
router.get('/:name', (req, res, next) => {
  getPizzaFromName(req, res, next);
});

// TODO: Add Read from price API
// TODO: Add Read from _id API
// TODO: Add Read from ingredient_ids API
// TODO: Add Read from update_at API

// Save pizza
router.post('/save', (req, res, next) => {
  savePizza(req, res, next);
});

// TODO: Create the Update API
// TODO: Create the Delete API


// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //

// Get all pizza order by update_at desc
function getAllPizza (req, res, next) {
  pizzaSchema.find({}, null, { sort: { update_at: -1 }})
  .populate('ingredient_ids')
  .exec((err, docs) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message: err });
    }
    else {
      res.status(200).json(docs);
    }
  });
}

// Get a specific pizza from name
function getPizzaFromName (req, res, next) {
  pizzaSchema.findOne({ name: req.params.name })
  .populate('ingredient_ids')
  .exec((err, docs) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message: err });
    }
    else {
      res.status(200).json(docs);
    }
  });
}

// Save pizza
function savePizza (req, res, next) {
  const newPizza = new pizzaSchema(req.body);
  
  newPizza.save((err, savedPizza) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message: err });
    }
    else {
      ServerEvent.emit('PizzaSaved', savedPizza);
      res.status(200).end();
    }
  });
}


// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
console.log('pizzaEvent is Ready !!!');
ServerEvent.on('myEvent', (data, socket) => {
  console.log('This is myEvent call');
  // ServerEvent.emit('myEventDone', data, socket);
});

// Export
module.exports = router;