'use strict';
 /**
 * Ingredient Controller
 * @module ingredientController
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
 * Get All Ingredient
 * @memberof Ingredient
 * @function
 */
router.get('/', (req, res, next) => {
  getIngredients(req, res, next);
});

/**
 * Get Ingredient by Id
 * @memberof Ingredient
 * @function
 * @param ingredient_id
 * @name /:ingredient_id'
 */
router.get('/:ingredient_id', (req, res, next) => {
  getIngredientById(req, res, next);
});

/**
 * Get Ingredient by Name
 * @memberof Ingredient
 * @function
 * @param name
 * @name /name/:name'
 */
router.get('/name/:name', (req, res, next) => {
  getIngredientByName(req, res, next);
});

/**
 * Get Ingredient by Price
 * @memberof Ingredient
 * @function
 * @param price
 * @name /price/:price'
 */
router.get('/price/:price', (req, res, next) => {
  getIngredientByPrice(req, res, next);
});

/**
 * Get Ingredient by pizza Id 
 * @memberof Ingredient 
 * @function
 * @param pizza_ids
 * @name /pizzaid/:pizza_ids'
 */
router.get('/pizzaid/:pizza_ids', (req, res, next) => {
  getIngredientInPizza(req, res, next);
});

/**
 * Get Ingredient by created_at 
 * @memberof Ingredient 
 * @function
 * @param create_at
 * @name /created/:created_at'
 */
router.get('/created/:created_at', (req, res, next) => {
  getIngredientCreatedAt(req, res, next);
});

/**
 * Update Ingredient 
 * @memberof Ingredient 
 * @function
 * @param ingredient_id
 * @name /:ingredient_id'
 */
router.put('/:ingredient_id', (req, res, next) => {
  updateIngredient(req, res, next);
});

/**
 * Create Ingredient 
 * @memberof Ingredient 
 * @function
 */
router.post('/', (req, res, next) => {
  createIngredient(req, res, next);
});

/**
 * Delete Ingredient 
 * @memberof Ingredient 
 * @function
 * @param ingredient_id
 * @name /:ingredient_id'
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
                    ServerEvent.emit('pizzaUpdated', ingredient);      
                    res.status(200);    
                    res.send(ingredient);
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