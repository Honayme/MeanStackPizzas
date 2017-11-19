'use strict';

 /**
 * Schéma Ingredient
 * @module ModelIngredient
 * @requires mongoose
 */

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * @class Ingredient
 * @param {String} name - ingredient's name, required, unique
 * @param {String} weight - ingredient's weight , required
 * @param {Number} price - ingredient's price, required
 * @param {Array} pizzas - List of ingredient's pizza
 * @param {Date} create_at - ingredient's date of creation
 * @param {Date} update_at - ingredient's date of modification
 * @return {Schema}
 */
const IngredientSchema = new Schema({
    name      : { type: String, unique: true, required: true },
    weight    : { type: String, required: true },
    price     : { type: Number, required: true },
    pizza_ids : [{ type: Schema.Types.ObjectId, ref: 'Pizza'}], //Choix de ne pas rendre bloquant le fait de créer un ingrédient sans l'affilier à une pizza
    create_at : { type: Date },
    update_at : { type: Date },
});

/**
 * @function preValidate
 * @param {function} next - Allow to call the next middleware
 * @description display a message when the query is effective
 */
IngredientSchema.pre('validate', (next) => {
    console.log("Enregistrement en cours");
  next();
});


/**
 * @function preSave
 * @param {function} next - Express next middleware function
 * @param {Object} err - Message generate when an error occurre
 * @this Registering-Igredient
 * @description When the data is save in the database, register the creation date and the modification date. 
 * If it's a new object create_at and update_at get the same value.
 * Plus, push the ingredient in the pizza's ingredient array.
 */
IngredientSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.create_at = this.update_at;
  }
  mongoose.model('Pizza')//Get pizza model
  .update({ _id: { $in: this.pizza_ids }},//Get the specific id mention when we save 
  { $push: { ingredient_ids: this._id }},// Push the ingredient id in the pizza document
  { multi: true })// The register can be multiple 
  .exec();
  next();
});


module.exports = mongoose.model('Ingredient', IngredientSchema);


