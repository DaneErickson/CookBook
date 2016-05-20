"use strict";
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ingredientSchema = require('./Ingredient.js').Schema;
const stepSchema       = require('./Step.js').Schema;

const ingredientModel  = require('./Ingredient.js').Model;
const nutritionModel   = require('./Nutrition.js').Model;


const recipeSchema = mongoose.Schema({
  author      : {
                  name   : String,
                  email  : String,
                },
  steps       : [{
                  type : Schema.Types.ObjectId,
                  ref  : 'Step',
                }],
  ingredients : [{ingredient : {
                    type : Schema.Types.ObjectId,
                    ref  : 'Ingredient',
                  },
                  amount : { quantity: { type: Number, default: 0 },
                            unit    : { type: String, default: 'g' }},
                }],
});

// returns a json object representing all the nutrients in the recipe.
// TODO improvements: divide & conquer, recursively sum over left half,
//                    over right half, then combine.
recipeSchema.methods.getNutrients = function(){
  if (this.ingredients.length === 0){
    return new ingredientModel({});
  }
  var nutrients = this.ingredients[0].getNutrients(this.ingredients[0].amount);
  for(var i = 1; i<this.ingredients.length; i++){
    nutrients = nutritionModel.sum(nutrients,this.ingredients[i]);
  }
  return nutrients;
}

module.exports = mongoose.model('Recipe', recipeSchema);
