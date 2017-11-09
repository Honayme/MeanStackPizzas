'use strict';
 /**
 * Pizza Controller
 * @module pizzaController
 */
 

// Get schema from model
const pizzaSchema = require('../Model/pizzaSchema');
const ingredientSchema = require('../Model/ingredientSchema');

const express = require('express');
const router = express.Router();
const path = require('path');
const ServerEvent = require('./ServerEvent');

// -------------------------------------------------------------------------- //
//                                Router                                      //
// -------------------------------------------------------------------------- //

router.get('/', (req,res,next) => {
    getPizzas(req,res,next);
}); 
 
router.get('/:pizza_id', (req,res,next) => {
    getPizza(req,res,next);
}); 

router.get('/lastupdated', (req,res,next) => {
    getPizzaByLastUpdate(req,res,next);
});

router.get('/name/:name', (req,res,next) => {
    getPizzaByName(req,res,next);
}); 

router.get('/price/:price', (req,res,next) => {
    getPizzaByPrice(req,res,next);
}); 

router.get('/ingredient/:ingredient_id', (req,res,next) => {
    getPizzaByIngredient(req,res,next);
}); 

router.get('/update/:updated_at', (req,res,next) => {
    getPizzaByUpdate(req,res,next);
}); 

router.put('/:pizza_id', (req,res,next) => {
    updatePizza(req,res,next);
});

router.post('/', (req,res,next) => {
    createPizza(req,res,next);
}); 

router.delete('/:pizza_id', (req,res,next) => {
    deletePizza(req,res,next);
}); 


// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //

//Voir première fonction C9 jeremy
//Utiliser un populate dans le query builder
//Utiliser un exec une fois que les ingrédients "peuple" la pizza
//sort by asc
function getPizzas(req,res,next){
    pizzaSchema.find((err,pizza) => {
        console.log("Je suis dans ma méthode/callback");
        if(err){
            res.send(err); 
        }else{
            res.send(pizza);
        }
    next();
    });
}

//Get pizza by last update
function getPizzaByLastUpdate(req, res, next) {
  pizzaSchema.find({}, null, { sort: { update_at: -1 }})
//   .populate('ingredient_ids') // METHODE POUR INJECTER LES INGREDIENTS DANS LA PIZZA A PARTIR DE LEUR ID  ! 
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


//Utiliser un populate dans le query builder
//Utiliser un exec une fois que les ingrédients "peuple" la pizza
function getPizza(req,res,next){
    pizzaSchema.findOne({_id: req.params.pizza_id}, (err, pizza) =>{
        if(err){
            res.send(err); 
        }else{
            res.send(pizza);
        }
    next();
    });
}


//Utiliser un populate dans le query builder
//Utiliser un exec une fois que les ingrédients "peuple" la pizza
function getPizzaByName(req,res,next){
    pizzaSchema.find({name: req.params.name}, (err, pizza) =>{
        console.log(pizza);
        if(err){
            res.send(err); 
        }else{
            res.send(pizza);
        }
    next();
    });
}

//Utiliser un populate dans le query builder
//Utiliser un exec une fois que les ingrédients "peuple" la pizza
function getPizzaByPrice(req,res,next){
    pizzaSchema.find({price: req.params.price}, (err, pizza) =>{
        console.log(pizza);
        if(err){
            res.send(err); 
        }else{
            res.send(pizza);
        }
    next();
    });
}

//Utiliser un populate dans le query builder
//Utiliser un exec une fois que les ingrédients "peuple" la pizza
function getPizzaByIngredient(req,res,next){
    pizzaSchema.find({_id:req.params.ingredient_id}, (err, pizza) =>{
        console.log(pizza);
        if(err){
            res.send(err); 
        }else{
            res.send(pizza);
        }
    next();
    });
}

//Utiliser un populate dans le query builder
//Utiliser un exec une fois que les ingrédients "peuple" la pizza
function getPizzaByUpdate(req,res,next){
    pizzaSchema.find({update_at: req.params.updated_at}, (err, pizza) =>{
        console.log(pizza);
        if(err){
            res.send(err); 
        }else{
            res.send(pizza);
        }
    next();
    });  
}



function updatePizza(req,res,next){
        pizzaSchema.findOne({_id:req.params.pizza_id}, (err,pizza) =>{
        if(err){
            res.send(err)
        }else{
            //Faire une req.body
            pizza.name = req.body.name; //Body car on récupère la nouvelle valeur à partir d'un formulaire
            pizza.desc = req.body.desc;
            pizza.price = req.body.price;       
            pizza.picture = req.body.picture;       
            pizza.ingredient_ids = req.body.ingredient_ids
            
            pizza.save((err) => {
                if(err){
                    res.send(err);
                }else{
                    ServerEvent.emit('pizzaUpdated', updatePizza);                    
                    res.send(pizza);
                }
            next();  
            });    
        }
         
    });
}


function createPizza(req,res,next){
    const pizza = new pizzaSchema();
    
    pizza.name = req.body.name;
    pizza.desc = req.body.desc;
    pizza.price = req.body.price;
    pizza.picture = req.body.picture;       
    pizza.ingredient_ids = req.body.ingredient_ids
    
    pizza.save((err) => {
        if(err){
            res.send(err);
        }else{
            ServerEvent.emit('pizzaCreated', createPizza);            
            res.send(pizza);
        }
       
      next();  
    });
}



function deletePizza(req,res,next){
    pizzaSchema.remove({_id:req.params.pizza_id}, (err, pizza) =>{ //Ce sont les paramètre de l'url qu'on récupère
        if(err){
            console.error(err);
            res.status(500);
            res.json({ message: err });
        }else{
            ServerEvent.emit('pizzaDeleted', deletePizza);
            res.status(200);
            res.send(pizza)
        }
    next();  
    });
}

/**
 * Mettre à jour une pizza avec son id.
 * @module myMiddleware
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */


/**
 * Créer une pizza.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {pizza}
 */


/**
 * Supprimer une pizza
 * @module myMiddleware
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */
 
 
// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
console.log('pizzaEvent is Ready !!!');


ServerEvent.on('pizzaUpdated', (data, socket) => {
  console.log('Pizza updated');
  // ServerEvent.emit('myEventDone', data, socket);
});

ServerEvent.on('pizzaCreated', (data, socket) => {
  console.log('Pizza created');
  // ServerEvent.emit('myEventDone', data, socket);
});

ServerEvent.on('pizzaDeleted', (data, socket) => {
  console.log('Pizza deleted');
//   ServerEvent.emit('myEventDone', data, socket);
});


// Export

module.exports = router