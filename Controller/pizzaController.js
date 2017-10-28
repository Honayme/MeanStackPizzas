'use strict';
 /**
 * Pizza Controller
 * @module pizzaController
 */
 
// const request = require('request');

// Get schema from model
const pizzaSchema = require('../Model/pizzaSchema');

const express = require('express');
const router = express.Router();
const path = require('path');



/**
 * Récupérer les pizzas.
 * @module myMiddleware
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */
router.get('/pizzatest', (req,res,next) => {
    pizzaSchema.find((err,pizza) => {
        if(err){
            res.send(err); 
        }
        console.log(pizza);
    });
    next();
}); 


/**
 * Créer une pizza.
 * @module myMiddleware
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {undefined}
 */
router.post('/pizzatest', (req, res, next) =>{
    const pizza = new pizzaSchema();
    pizza.name = req.body.name;
    pizza.desc = req.body.desc;
    pizza.price = req.body.price;

    pizza.save((err) => {
        if(err){
            res.send(err);
        }
        console.log(pizza);
    });
  next();
});




// router.get('/', (req, res, next) => {
//     // res.sendFile(path.join(__dirname, '../VIEW' , 'index.html'));
//     // res.sendFile(path.join(__dirname, '../public', 'index1.html'));
//     console.log('Affichage de la page') ;
//     next();
// });

// router.get('/', (req, res, next) => {
//     var blocks = ['Napolitaine', '4 Fromages', 'Calzone'];
//     res.json(blocks);
// });


module.exports = router;