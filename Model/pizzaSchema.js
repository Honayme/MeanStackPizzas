'use strict';
 /**
 * Schéma Pizza
 * @module Pizza
 */

/**
 * @requires Mongoose Schema
 */
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * @class Pizza
 * @param {String} name - pizza's name, required
 * @param {String} desc - pizza's short description , required
 * @param {String} picture - pizza's image 
 * @param {Array} ingredients - List of pizza's ingredients
 * @param {Number} price - pizza's price, required
 * @param {Date} create_at - pizza's date of creation
 * @param {Date} update_at - pizza's date of modification
 * @return {Schema}
 */
const pizzaSchema = new Schema({
    name            : { type: String, unique: true, required: true },
    desc            : { type: String, required: true },
    picture         : { type: String, required: true },
    price           : { type: Number, required: true },
    ingredient_ids  : [{ type: Schema.Types.ObjectId, ref: 'Ingredient', required: true}],
    create_at       : { type: Date },
    update_at       : { type: Date },
});

/**
 * @function preValidate
 * @param {function} next -  Allow to call the next middleware
 * @description display a message when the query is effective
 */
pizzaSchema.pre('validate', (next) => {
    console.log("Enregistrement en cours");
  next();
});


/**
 * @function preSave
 * @param {function} next - Express next middleware function
 * @param {Object} err - Message generate when an error occurre
 * @this - The pizza object who's be registering 
 * @description When the data is save in the database, register the creation date and the modification date. 
 * If it's a new object create_at and update_at get the same value.
 * Plus, push the pizza in the ingredient's pizza array.
 */
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
