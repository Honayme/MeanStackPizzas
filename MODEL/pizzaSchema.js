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
const PizzaSchema = new Schema({
    name            : { type: String, uniq: true, required: true },
    desc            : { type: String, required: true },
    picture         : { data: String, contentType: String },
    price           : { type: Number, required: true },
    ingredient_ids  : [{ type: Schema.Types.ObjectId, ref: 'Ingredient', required: true }],
    create_at       : { type: Date },
    update_at       : { type: Date },
});

/**
 * @function preValidate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description WIP
 */
PizzaSchema.pre('validate', function(next) {
  next();
});

/**
 * @function prefindOneAndUpdate
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Met à jour la date de la propriété update_at
 */
PizzaSchema.pre('findOneAndUpdate', function (next) {
  this._update.update_at = Date.now();
  next();
});

/**
 * @function preSave
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Met à jour la date de la propriété update_at + create_at si c'est un nouveau document
 */
PizzaSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.create_at = this.update_at;
  }
  
  // Update all ingredients
  mongoose.model('Ingredient').update({ _id: { $in: this.ingredient_ids }}, { $push: { pizza_ids: this._id }}, { multi: true }).exec();
  next();
});

/**
 * @function findOneAndRemove
 * @param {function} next - Permet d'appeler le prochain middleware
 * @description Permet de supprimer la reference de la pizza de tous les ingredients
 */
PizzaSchema.pre('findOneAndRemove', function(next) {
  // Update all ingredients
  mongoose.model('Ingredient').update({}, { $pull: { pizza_ids: this._conditions._id }}, { multi: true }).exec();
  next();
});

/**
 * @function postSave
 * @description Affiche en console que l'enregistrement est un succès
 */
PizzaSchema.post('save', function() {
  console.log('Pizza saved successfully!');
});


module.exports = mongoose.model('Pizza', PizzaSchema);