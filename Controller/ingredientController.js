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
router.get('/', (req, res, next) => {
  getIngredients(req, res, next);
});

router.get('/:ingredient_id', (req, res, next) => {
  getIngredientById(req, res, next);
});

router.get('/name/:name', (req, res, next) => {
  getIngredientByName(req, res, next);
});

router.get('/price/:price', (req, res, next) => {
  getIngredientByPrice(req, res, next);
});

router.get('/pizzaid/:pizza_ids', (req, res, next) => {
  getIngredientInPizza(req, res, next);
});

router.get('/created/:created_at', (req, res, next) => {
  getIngredientCreatedAt(req, res, next);
});

router.put('/:ingredient_id', (req, res, next) => {
  updateIngredient(req, res, next);
});

router.post('/', (req, res, next) => {
  createIngredient(req, res, next);
});

// Delete ingredient
router.delete('/:ingredient_id', (req, res, next) => {
  deleteIngredient(req, res, next);
});


// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //


function getIngredients(req,res,next){
    ingredientSchema.find((err,ingredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(ingredient);
        }
    next();
    });
}

function getIngredientById(req,res,next){
    ingredientSchema.findOne({_id: req.params.ingredient_id}, (err,ingredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(ingredient);
        }
    next();
    }); 
}


function getIngredientByName(req,res,next){
    ingredientSchema.findOne({name: req.params.name}, (err,ingredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(ingredient);
        }
    next();      
});
}


function getIngredientByPrice(req,res,next){
    ingredientSchema.find({price: req.params.price}, (err,ingredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(ingredient);
        }
    next();      
    });
}

function getIngredientInPizza(req,res,next){
    ingredientSchema.find({pizza_ids: req.params.pizza_ids}, (err,ingredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(ingredient);
        }
    next();      
    });
}

function getIngredientCreatedAt(req,res,next){
    ingredientSchema.find({create_at: req.params.created_at}, (err,ingredient) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(ingredient);
        }
    next();      
    });
}


function updateIngredient(req,res,next){
    ingredientSchema.findOne({_id:req.params.ingredient_id}, (err,ingredient) =>{
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            Object.assign(ingredient, req.body).save((err, ingredient) => {
                if(err){
                    console.error(err);
                    res.status(500);
                    res.send(err);
                }else{
                    ServerEvent.emit('pizzaUpdated', ingredient);      
                    res.status(200);    
                    res.send(ingredient);
                }
            next();  
            });    
        }
         
    });
}



// Save ingredient
function createIngredient (req, res, next) {
  const newIngredient = new ingredientSchema(req.body);

  newIngredient.save((err, savedIngredient) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.send(err);
    }
    else {
      ServerEvent.emit('ingredientCreated', savedIngredient);
      res.status(200);
      res.send(savedIngredient);
    }
  });
}

// Delete ingredient
function deleteIngredient (req, res, next) {
  ingredientSchema.findOneAndRemove({_id: req.params.ingredient_id })
  .exec((err, removedIngredient) => { //exec allow us to execute a callback after we use the query builder
    if (err) {
        console.error(err);
        res.status(500);
        res.send(err);
    }
    else {
        ServerEvent.emit('ingredientDeleted', removedIngredient);
        res.status(200);
        res.send(removedIngredient);
    }
  });
}
// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
console.log('ingredientEvent is Ready !!!');

ServerEvent.on('ingredientUpdated', (data, socket) => {
  console.log('Ingredient updated');
  // ServerEvent.emit('myEventDone', data, socket);
});

ServerEvent.on('ingredientCreated', (data, socket) => {
  console.log('Ingredient created');
  // ServerEvent.emit('myEventDone', data, socket);
});

ServerEvent.on('ingredientDeleted', (data, socket) => {
  console.log('Ingredient deleted');
//   ServerEvent.emit('myEventDone', data, socket);
});


// Export
module.exports = router;