'use strict';
 /**
 * Ingredient Controller
 * @module ControllerIngredient
 * @requires pizzaSchema
 * @requires ServerEvent
 * @requires express
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

/**
 * ROUTE Get All Ingredients
 * @function
 * @name get/
 * @returns {Object} Get All ingredients object in database
 */
router.get('/', (req, res, next) => {
  getIngredients(req, res, next);
});

/**
 * ROUTE Get Ingredient by Id
 * @function
 * @name get/:ingredient_id
 * @returns {Object} Get specific ingredient with the given id
 */
router.get('/:ingredient_id', (req, res, next) => {
  getIngredientById(req, res, next);
});

/**
 * ROUTE Get Ingredient by name
 * @function
 * @name get/name/:name
 * @returns {Object} Get specific ingredient with the given name
 */
router.get('/name/:name', (req, res, next) => {
  getIngredientByName(req, res, next);
});

/**
 * ROUTE Get Ingredient by price
 * @function
 * @name get/price/:price
 * @returns {Object} Get specific ingredient with the given price
 */
router.get('/price/:price', (req, res, next) => {
  getIngredientByPrice(req, res, next);
});

/**
 * ROUTE Get Ingredient by pizza id
 * @function
 * @name get/pizzaid/:pizza_ids
 * @returns {Object} Get specific ingredient with the given pizza id
 */
router.get('/pizzaid/:pizza_ids', (req, res, next) => {
  getIngredientInPizza(req, res, next);
});

/**
 * ROUTE Get Ingredient by create
 * @function
 * @name get/created/:created_at
 * @returns {Object} Get specific ingredient with the given created_at
 */
router.get('/created/:created_at', (req, res, next) => {
  getIngredientCreatedAt(req, res, next);
});

/**
 * ROUTE Update Ingredient
 * @function
 * @name put/:ingredient_id'
 * @returns {Object} return the ingredient which was modify
 */
router.put('/:ingredient_id', (req, res, next) => {
  updateIngredient(req, res, next);
});

/**
 * ROUTE Create Ingredient
 * @function
 * @name post/
 * @returns {Object}  return the ingredient which was created
 */
router.post('/', (req, res, next) => {
  createIngredient(req, res, next);
});

/**
 * ROUTE Delete Ingredient
 * @function
 * @name delete/
 * @returns {Object}  return the ingredient which was deleted
 */
router.delete('/:ingredient_id', (req, res, next) => {
  deleteIngredient(req, res, next);
});


// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //

/**
 * Get All Ingredient
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient values
 */
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

/**
 * Get Ingredient by Id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient value get by id
 */
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

/**
 * Get Ingredient by Name
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient value get by name
 */
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

/**
 * Get Ingredient by Price
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient value get by price
 */
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

/**
 * Get Ingredient they are in a given pizza
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient value get by pizza id
 */
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


/**
 * Get Ingredient they are in a given pizza
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient value get by date of creation
 */
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


/**
 * Update an Ingredient
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient that was updated
 */
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
                    ServerEvent.emit('ingredientUpdated', ingredient);      
                    res.status(200);    
                    res.send(ingredient);
                    global.io.emit('IngredientUpdated', ingredient);
                }
            next();  
            });    
        }
         
    });
}


/**
 * Create an Ingredient
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient that was created
 */
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
      global.io.emit('IngredientCreated', savedIngredient);
    }
  });
}

/**
 * Delete an Ingredient
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent ingredient that was deleted
 */
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
        global.io.emit('IngredientDeleted', removedIngredient);
    }
  });
}
// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
console.log('ingredientEvent is Ready !!!');

/**
 * @event Update Operation Ingredient
 * @param {Object} data - The result of update CRUD operation
 * @fires   Console log specify what is the updated object
 */
ServerEvent.on('ingredientUpdated', (data, socket) => {
   console.log(`This ingredient has been updated ${data}`);
});

/**
 * @event Create Operation Ingredient
 * @param {Object} data - The result of create CRUD operation
 * @fires   Console log specify what is the created object
 */
ServerEvent.on('ingredientCreated', (data, socket) => {
  console.log(`This ingredient has been created ${data}`);
});

/**
 * @event Delete Operation Ingredient
 * @param {Object} data - The result of delete CRUD operation
 * @fires   Console log specify what is the deleted object
 */
ServerEvent.on('ingredientDeleted', (data, socket) => {
  console.log(`This ingredient has been deleted ${data}`);
});


// Export
module.exports = router;