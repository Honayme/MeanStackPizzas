'use strict';

// TODO: Make Doc

// Get schemas
const ingredientSchema = require('../Model/ingredientSchema');

// Get modules
const express = require('express');
const router  = express.Router();
const ServerEvent = require('./ServerEvent');
// const request = require('request');


// -------------------------------------------------------------------------- //
//                                Router                                      //
// -------------------------------------------------------------------------- //

// Delete ingredient
router.delete('/', (req, res, next) => {
  deleteIngredient(req, res, next);
});

// Save ingredient
router.post('/save', (req, res, next) => {
  saveIngredient(req, res, next);
});

// TODO: Create the Read API (list all ingredient (order by name asc) / get only one from name or price or pizza_ids or created_at)
// TODO: Create the Update API

// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //

// Delete ingredient
function deleteIngredient (req, res, next) {
  // TODO change name by _id
  ingredientSchema.findOneAndRemove({ name: req.body.name })
  .exec((err, removedIngredient) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message: err });
    }
    else {
      ServerEvent.emit('IngredientRemoved', removedIngredient);
      res.status(200).json(removedIngredient);
    }
  });
}

// Save ingredient
function saveIngredient (req, res, next) {
  const newIngredient = new ingredientSchema(req.body);
  
  newIngredient.save((err, savedIngredient) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message: err });
    }
    else {
      res.status(200).end();
    }
  });
}


// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
console.log('IngredientEvent is Ready !!!');
ServerEvent.on('myEvent', (data, socket) => {
  console.log('This is myEvent call');
  // ServerEvent.emit('myEventDone', data, socket);
});

// Export
module.exports = router;