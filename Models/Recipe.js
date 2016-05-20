"use strict";
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ingredientSchema = require('./Ingredient.js').Schema;
const stepSchema       = require('./Step.js').Schema;

const ingredientModel  = require('./Ingredient.js').Model;
const nutritionModel   = require('./Nutrition.js').Model;

// A document mapping an author, a list of steps, and a list of ingredients
// to the abstract idea of a recipe.
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

// returns a Nutrition document representing all of the nutrients in the recipe.
// TODO improvements: divide & conquer, recursively sum over left half,
//                    over right half, then combine.
recipeSchema.methods.getNutrients = function(){
  if (this.ingredients.length === 0){
    return new ingredientModel({});
  }
  this.populate('ingredients');
  var nutrients = this.ingredients[0].getNutrients(this.ingredients[0].amount);
  for(var i = 1; i<this.ingredients.length; i++){
    nutrients = nutritionModel.sum(nutrients,this.ingredients[i]);
  }
  return nutrients;
}

// param step: a Step document
// adds the Step to the list of steps in the recipe
recipeSchema.methods.addStep = function(step){
  this.steps.push(step);
}

// param ingredient: an Ingredient document
// param amount    : the amount of the ingredient to add.
// adds the Ingredient to the list of ingredients in the recipe.
recipeSchema.methods.addIngredient = function(ingredient,amount){
  this.ingredients.push({
    ingredient : ingredient,
    amount     : amount,
  });
}

module.exports = mongoose.model('Recipe', recipeSchema);
