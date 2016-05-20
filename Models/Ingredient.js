const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const nutritionSchema = require('./nutritionSchema');


const ingredientSchema = mongoose.Schema({
  type      : String,
  nutrition : nutritionSchema,
});

ingredientSchema.methods.getNutrients = function(servings){
  return this.nutrition.scale(servings);
}

mongoose.exports = {
  Schema : ingredientSchema,
  Model  : mongoose.model('Ingredient',ingredientSchema);
}
