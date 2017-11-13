'use strict';
 /**
 * Schéma Pizza
 * @module PizzaSchema
 */

/**
 * @requires Schema
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Schema PizzaSchema
/**
 * @class PizzaSchema
 * @param {String} name - Nom de la pizza (Requis)
 * @param {String} desc - Courte description accrocheur de la pizza sexy (Requis)
 * @param {String} picture - Image de la pizza stocké en base 64
 * @param {Array} ingredients - Liste des ingredients (Requis)
 * @param {Number} price - Prix de la pizza (Requis)
 * @param {Date} create_at - Date de création
 * @param {Date} update_at - Date de mise à jour
 * @return {Schema}
 */
const pizzaSchema = new Schema({
    name            : { type: String, uniq: true, required: true },
    desc            : { type: String, required: true },
    picture         : { type: String, required: true },
    price           : { type: Number, required: true },
    ingredient_ids  : [{ type: Schema.Types.ObjectId, ref: 'Ingredient', required: true}],
    create_at       : { type: Date },
    update_at       : { type: Date },
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description WIP
 */
pizzaSchema.pre('validate', (next) => {
    console.log("Enregistrement en cours");
  next();
});


/**
 * @function preSave
 * @param {function} next - Express next middleware function
 * @param {Object} err - Message generate when an error occurre
 * @description Sauvegarde en base la date de modification ainsi que la date de création si l'objet est nouveau
 * Mettre un ingrédient dans une pizza à l'aide de son ID, à la modification ou à la 
 * création de la pizza
 */
 //crème fraiche: 5a08cab1ceefce4dccc1920d
 //tartiflette : 5a072828682f06bd7c65efff
 //TESTER si à la création d'une pizza les ingrédients spécifiés s'enregistre aussi 
//---------- MARCHE !!!! ----------//  
pizzaSchema.pre('save', function(next, err) {
    this.update_at = Date.now();
        if (this.isNew) {
            this.create_at = this.update_at;
        }
      // console.log(`Date de mise à jour ${this.update_at}`)    
      // console.log(`Date de création ${this.create_at}`)    
      // Update all ingredients
      mongoose.model('Ingredient')
      .update({ _id: { $in: this.ingredient_ids }},
      { $push: { pizza_ids: this._id }},
      { multi: true })
      .exec();
  next();
});

module.exports = mongoose.model('Pizza', pizzaSchema);
