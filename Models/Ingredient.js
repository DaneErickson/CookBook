"use strict";
const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const nutritionSchema = require('./Nutrition.js');


const ingredientSchema = mongoose.Schema({
  type      : String,
  amount: { quantity: { type: Number, default: 0 },
            unit    : { type: String, default: 'g' }},
  nutrition : {
    type : Schema.Types.ObjectId,
    ref  : 'Nutrition',
  },
});

// param amount, the amount { unit: X, quantity: Y } of the ingredient
// returns the nutrition document corresponding to the amount of nutrition in
//    that amount of the given ingredient.
ingredientSchema.methods.getNutrients = function(amount){
  var multiplier = unit.ratio(amount.unit, this.unit);
  return this.nutrition.scale(multiplier);
}

// param nutrition, a nutrition document detailing the nutrients of the given
//    ingredient.
ingredientSchema.methods.setNutrients = function(nutrition){
  this.nutrition = nutrition;
}

ingredientSchema.methods.toString = function(){
  return  this.type + ": " + this.amount.quantity + " " + this.amount.unit +".";
}

module.exports = {
  Schema : ingredientSchema,
  Model  : mongoose.model('Ingredient',ingredientSchema),
}
