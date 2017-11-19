'use strict';
 /**
 * Pizza Controller
 * @module ControllerPizza
 * @requires pizzaSchema
 * @requires ServerEvent
 * @requires express
 */
 
// Get schemas
const pizzaSchema = require('../Model/pizzaSchema');

// Get modules
const express = require('express');
const router = express.Router();
const ServerEvent = require('./ServerEvent');



// -------------------------------------------------------------------------- //
//                                Router                                      //
// -------------------------------------------------------------------------- //

/**
 * ROUTE Get All Pizzas
 * @function
 * @name get/
 * @returns {Object} Get All ingredients object in database
 */
router.get('/', (req,res,next) => {
    getPizzas(req,res,next);
}); 

/**
 * ROUTE Get Pizza By Id
 * @function
 * @name get/:pizza_id'
 * @returns {Object} Get specific pizza with the given id
 */
router.get('/:pizza_id', (req,res,next) => {
    getPizzaById(req,res,next);
}); 

/**
 * ROUTE Get Pizza By Name
 * @function
 * @name get/name/:name'
 * @returns {Object} Get specific pizza with the given name
 */
router.get('/name/:name', (req,res,next) => {
    getPizzaByName(req,res,next);
}); 

/**
 * ROUTE Get Pizza By Price
 * @function
 * @name get/price/:price'
 * @returns {Object} Get specific pizza with the given price
 */
router.get('/price/:price', (req,res,next) => {
    getPizzaByPrice(req,res,next);
}); 

/**
 * ROUTE Get Pizza By Ingredient Id
 * @function
 * @name get/ingredient/:ingredient_id''
 * @returns {Object} Get specific pizza with the given ingredient id
 */
router.get('/ingredient/:ingredient_id', (req,res,next) => {
    getPizzaByIngredientId(req,res,next);
}); 

/**
 * ROUTE Get Pizza By update_at
 * @function
 * @name get/update/:update_at'
 * @returns {Object} Get specific pizza with the given update
 */
router.get('/update/:update_at', (req,res,next) => {
    getPizzaByUpdate(req,res,next);
}); 

/**
 * ROUTE Update Pizza  
 * @function
 * @name put/:pizza_id'
 * @returns {Object} return the pizza which was modify
 */
router.put('/:pizza_id', (req,res,next) => {
    updatePizza(req,res,next);
});

/**
 * ROUTE Create Pizza
 * @function
 * @name post/:pizza_id'
 * @returns {Object} return the pizza which was created
 */
router.post('/', (req,res,next) => {
    createPizza(req,res,next);
}); 

/**
 * ROUTE Delete Pizza
 * @function
 * @name delete/:pizza_id'
 * @returns {Object} return the pizza which was deleted
 */
router.delete('/:pizza_id', (req,res,next) => {
    deletePizza(req,res,next);
}); 


// -------------------------------------------------------------------------- //
//                              Functions                                     //
// -------------------------------------------------------------------------- //

/**
 * Get All Pizza
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza values
 */
function getPizzas(req,res,next){
    pizzaSchema.find()
    .populate('ingredient_ids')
    .exec((err,pizza) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(pizza);
        }
    next();
    });
}


/**
 * Get Pizza by Id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza value get by id 
 */
function getPizzaById(req,res,next){
    pizzaSchema.findOne({_id: req.params.pizza_id})
    .populate('ingredient_ids')
    .exec((err, pizza) =>{
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(pizza);
        }
    next();
    });
}


/**
 * Get Pizza by name
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza value get by name
 */
function getPizzaByName(req,res,next){
    pizzaSchema.find({name: req.params.name})
    .populate('ingredient_ids')
    .exec((err, pizza) =>{
        console.log(pizza);
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(pizza);
        }
    next();
    });
}

/**
 * Get Pizza by price
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza value get by price
 */
function getPizzaByPrice(req,res,next){
    pizzaSchema.find({price: req.params.price})
    .populate('ingredient_ids')
    .exec((err, pizza) =>{
        console.log(pizza);
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(pizza);
        }
    next();
    });
}

/**
 * Get Pizza by ingredient id 
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza value get by ingredient id
 */
function getPizzaByIngredientId(req,res,next){
    pizzaSchema.find({ingredient_ids: { $in : [req.params.ingredient_id] }})
    // PersonModel.find({ favouriteFoods: { "$in" : ["sushi"]} }, ...);
    .populate('ingredient_ids')
    .exec((err, pizza) =>{
        console.log(pizza);
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(pizza);
        }
    next();
    });
}


/**
 * Get Pizza by update_at
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza value get by update timestamp 
 */
function getPizzaByUpdate(req,res,next){
    pizzaSchema.find({update_at: req.params.update_at})
    .populate('ingredient_ids')
    .exec((err, pizza) =>{ // Faire un sort pour récupérer par last update 
        console.log(pizza);
        if(err){
            console.error(err);
            res.status(500);
            res.send(err); 
        }else{
            res.status(200);
            res.send(pizza);
        }
    next();
    });  
}


/**
 * Updatye a pizza
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza that was updated   
 */
function updatePizza(req,res,next){
        pizzaSchema.findById({_id:req.params.pizza_id}, (err,pizza) =>{
        if(err){
            res.send(err)
        }else{
            Object.assign(pizza, req.body).save((err, pizza) => {
                if(err){
                    console.error(err);
                    res.status(500);
                    res.send(err);
                }else{
                    ServerEvent.emit('pizzaUpdated', updatePizza);
                    res.status(200);                    
                    res.send(pizza);
                    global.io.emit('PizzaUpdated', pizza);
                }
            next();  
            });    
        }
         
    });
}

/**
 * Créer une pizza
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza that was created   
 */
function createPizza(req,res,next){
    const pizza = new pizzaSchema(req.body);

    pizza.save((err, pizza) => {
        if(err){
            console.error(err);
            res.status(500);
            res.send(err);
        }else{
            ServerEvent.emit('pizzaCreated', createPizza);       
            res.status(200);
            res.send(pizza);
            global.io.emit('PizzaCreated', pizza);
        }
      next();  
    });
}



/**
 * Supprimer une Pizza
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return callback object represent pizza that was deleted   
 */
function deletePizza(req,res,next){
    pizzaSchema.remove({_id:req.params.pizza_id}, (err, pizza) =>{ //Ce sont les paramètre de l'url qu'on récupère
        if(err){
            console.error(err);
            res.status(500);
            res.send(err);
        }else{
            ServerEvent.emit('pizzaDeleted', pizza);
            res.status(200);
            res.send(pizza);
            global.io.emit('PizzaDeleted', pizza);
        }
    next();  
    });
}


// -------------------------------------------------------------------------- //
//                                Events                                      //
// -------------------------------------------------------------------------- //
console.log('pizzaEvent is Ready !!!');

/**
 * @event Delete Operation Pizza
 * @param {Object} data - The result of delete CRUD operation
 * @fires  Console log specify what is the deleted object
 */
ServerEvent.on('pizzaDeleted', (data) => {
    console.log(`This pizza has been deleted ${data}`);
});

/**
 * @event Update Operation Pizza
 * @param {Object} data - The result of update CRUD operation
 * @fires  Console log specify what is the deleted object
 */
ServerEvent.on('pizzaUpdated', (data) => {
    console.log(`This pizza has been updated ${data}`);
});

/**
 * @event Create Operation Pizza
 * @param {Object} data - The result of create CRUD operation
 * @fires  Console log specify what is the deleted object
 */
ServerEvent.on('pizzaCreated', (data) => {
    console.log(`This pizza has been created ${data}`);
});



// Export
module.exports = router;