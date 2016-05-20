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

ingredientSchema.methods.getNutrients = function(amount){
  var multiplier = unit.ratio(amount.unit, this.unit);
  return this.nutrition.scale(multiplier);
}

ingredientSchema.methods.toString = function(){
  return  this.type + ": " + this.amount.quantity + " " + this.amount.unit +".";
}

mongoose.exports = {
  Schema : ingredientSchema,
  Model  : mongoose.model('Ingredient',ingredientSchema),
}
