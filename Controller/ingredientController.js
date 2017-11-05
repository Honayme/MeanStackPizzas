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
  getIngredient(req, res, next);
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

// Save ingredient
router.post('/', (req, res, next) => {
  createIngredient(req, res, next);
});

// Delete ingredient
router.delete('/:ingredient_id', (req, res, next) => {
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

function getIngredient(req,res,next){
    ingredientSchema.findOne({_id: req.params.ingredient_id}, (err,ingredient) => {
        if(err){
            res.send(err); 
        }else{
            res.send(ingredient);
        }
    next();
    }); 
}


function getIngredientByName(req,res,next){
    ingredientSchema.findOne({name: req.params.name}, (err,ingredient) => {
        if(err){
            res.send(err); 
        }else{
            res.send(ingredient);
        }
    next();      
});
}


function getIngredientByPrice(req,res,next){
    ingredientSchema.find({price: req.params.price}, (err,ingredient) => {
        if(err){
            res.send(err); 
        }else{
            res.send(ingredient);
        }
    next();      
    });
}

function getIngredientInPizza(req,res,next){
    ingredientSchema.find({pizza_ids: req.params.pizza_ids}, (err,ingredient) => {
        if(err){
            res.send(err); 
        }else{
            res.send(ingredient);
        }
    next();      
    });
}

function getIngredientCreatedAt(req,res,next){
    ingredientSchema.find({create_at: req.params.created_at}, (err,ingredient) => {
        if(err){
            res.send(err); 
        }else{
            res.send(ingredient);
        }
    next();      
    });
}


function updateIngredient(req,res,next){
    ingredientSchema.findOne({_id:req.params.ingredient_id}, (err,ingredient) =>{
        if(err){
            res.send(err)
        }else{
            ingredient.name = req.body.name; //Body car on récupère la nouvelle valeur à partir d'un formulaire
            ingredient.weight = req.body.weight;
            ingredient.price = req.body.price;       
            ingredient.pizza_ids = req.body.pizza_ids;       
            
            
            ingredient.save((err, savedIngredient) => {
                if(err){
                    res.send(err);
                }else{
                    ServerEvent.emit('pizzaUpdated', savedIngredient);                    
                    res.send(savedIngredient);
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
      res.json({ message: err });
    }
    else {
      ServerEvent.emit('ingredientCreated', savedIngredient);
      res.status(200).end();
    }
  });
}

// Delete ingredient
function deleteIngredient (req, res, next) {
  // TODO change name by _id
  ingredientSchema.findOneAndRemove({_id: req.body.ingredient })
  .exec((err, removedIngredient) => { //exec allow us to execute a callback after we use the query builder
    if (err) {
      console.error(err);
      res.status(500);
      res.json({ message: err });
    }
    else {
      ServerEvent.emit('ingredientDeleted', removedIngredient);
      res.status(200).json(removedIngredient);
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