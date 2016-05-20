const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const nutritionSchema = require('./nutritionSchema');


const ingredientSchema = mongoose.Schema({
  type      : String,
  amount: { quantity: { type: Number, default: 0 },
            unit    : { type: String, default: 'g' }},
  nutrition : nutritionSchema,
});

ingredientSchema.methods.getNutrients = function(amount){
  var multiplier = unit.ratio(amount.unit, this.unit);
  return this.nutrition.scale(multiplier);
}

mongoose.exports = {
  Schema : ingredientSchema,
  Model  : mongoose.model('Ingredient',ingredientSchema);
}
