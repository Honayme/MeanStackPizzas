'use strict';
 /**
 * Ingredient Controller
 * @module ingredientController
 */
// Get schemas
const ingredientSchema = require('../Model/ingredientSchema');

// Get modules
const express = require('express');
const router  = express.Router();
const ServerEvent = require('./ServerEvent');


// -------------------------------------------------------------------------- //
//                                Router                                      //
// -------------------------------------------------------------------------- //

//Get Order by asc
router.get('/ingr', (req, res, next) => {
  getIngredients(req, res, next);
});

router.get('/ingr/name/:name', (req, res, next) => {
  deleteIngredient(req, res, next);
});

router.get('/ingr/price/:price', (req, res, next) => {
  deleteIngredient(req, res, next);
});

router.get('/ingr/pizzaid/:pizza_id', (req, res, next) => {
  deleteIngredient(req, res, next);
});

router.put('/ingr/created/created_at', (req, res, next) => {
  deleteIngredient(req, res, next);
});

// Save ingredient
router.post('/ingr', (req, res, next) => {
  saveIngredient(req, res, next);
});

// Delete ingredient
router.delete('/ingr', (req, res, next) => {
  deleteIngredient(req, res, next);
});



// TODO: Create the Read API (list all ingredient (order by name asc) / get only one from name or price or pizza_ids or created_at)
// TODO: Create the Update API

// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //


function getIngredients(req,res,next){
    ingredientSchema.find((err,ingredient) => {
        console.log("Je suis dans ma méthode/callback");
        if(err){
            res.send(err); 
        }else{
            res.send(ingredient);
        }
    next();
    });
}



// Delete ingredient
function deleteIngredient (req, res, next) {
  // TODO change name by _id
  ingredientSchema.findOneAndRemove({ name: req.body.name })
  .exec((err, removedIngredient) => { //exec allow us to execute a callback after we use the query builder
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

ServerEvent.on('ingredientUpdated', (data, socket) => {
  console.log('Pizza updated');
  // ServerEvent.emit('myEventDone', data, socket);
});

ServerEvent.on('ingredientCreated', (data, socket) => {
  console.log('Pizza created');
  // ServerEvent.emit('myEventDone', data, socket);
});

ServerEvent.on('ingredientDeleted', (data, socket) => {
  console.log('Pizza deleted');
//   ServerEvent.emit('myEventDone', data, socket);
});
// Export
module.exports = router;