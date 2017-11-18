'use strict';

// TODO: Make Doc

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Pizza = require('./pizzaSchema');

const IngredientSchema = new Schema({
    name      : { type: String, unique: true, required: true },
    weight    : { type: String, required: true },
    price     : { type: Number, required: true },
    pizza_ids : [{ type: Schema.Types.ObjectId, ref: 'Pizza'}], //Choix de ne pas rendre bloquant le fait de créer un ingrédient sans l'affilier à une pizza
    create_at : { type: Date },
    update_at : { type: Date },
});

// function getPizzaFromName (req, res, next) {
//   pizzaSchema.findOne({ name: req.params.name })
//   .populate('ingredient_ids')
//   .exec((err, docs) => {
//     if (err) {
//       console.error(err);
//       res.status(500);
//       res.json({ message: err });
//     }
//     else {
//       res.status(200).json(docs);
//     }
//   });
// }










IngredientSchema.pre('findOneAndUpdate', function (next) {
  this._update.update_at = Date.now();
  next();
});


//Insérer pizza ID dans les ingédients.
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


