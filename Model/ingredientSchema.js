'use strict';

// TODO: Make Doc

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const IngredientSchema = new Schema({
    name      : { type: String, uniq: true, required: true },
    weight    : { type: String, required: true },
    price     : { type: Number, required: true },
    pizza_ids : [{ type: Schema.Types.ObjectId, ref: 'Pizza'}],
    create_at : { type: Date },
    update_at : { type: Date },
});


IngredientSchema.pre('findOneAndUpdate', function (next) {
  this._update.update_at = Date.now();
  next();
});

IngredientSchema.pre('save', function(next) {
  this.update_at = Date.now();
  if (this.isNew) {
    this.create_at = this.update_at;
  }
  next();
});

IngredientSchema.pre('findOneAndRemove', function(next) {
  // TODO: Change name by _id
  mongoose.model('Pizza').update({}, { $pull: { ingredient_ids: this._conditions.name }}, { multi: true }).exec();
  next();
});

module.exports = mongoose.model('Ingredient', IngredientSchema);