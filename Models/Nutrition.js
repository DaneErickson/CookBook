const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
const unit            = require('../modules/unit.js'):

const nutritionSchema = mongoose.Schema({
  nutrients   : {
    Vitamin_A   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'IU' }},

    Vitamin_B1  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B2  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B3  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B5  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B6  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B7  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B9  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_B12 : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_C   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Vitamin_D   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'IU' }},

    Vitamin_E   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'IU' }},

    Vitamin_K   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    // Macros
    Calories    : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'g' }},

    Fat         : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'g' }},

    Carbs       : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'g' }},

    Protein     : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'g' }},

    // Minerals
    Calcium     : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Iron        : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Magnesium   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Phosphorus  : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Potassium   : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},

    Zinc        : { amount: { quantity: { type: Number, default: 0 },
                              unit    : { type: String, default: 'mg' }},
  }
});

const model = mongoose.model(nutritionSchema);

// returns a json object of the nutrients
nutritionSchema.methods.scale(multiplier){
  var _nutrients     = new model({});
  var microNutrients = Object.keys(this.nutrients);

  for (var i = 0; i< microNutrients.length; i++){
    let amount  = this[microNutrients[i]];
    let _amount = unit.scale(amount, multiplier);
    _nutrients.microNutrients[i] = _amount;
  }
  return _nutrients;
}

// returns a json object of the sum of the two nutrients
nutritionSchema.statics.sum(nutrients1, nutrients2){
  var _nutrients     = new model({});
  var microNutrients = Object.keys(nutrient1);

  for (var i = 0; i < microNutrients.length; i++){
    let amount1 = nutrients1.microNutrients[i];
    let amount2 = nutrients2.microNutrients[i];
    let _amount = unit.sum(amount1,amount2);
    _nutrients.microNutrients[i] = _amount;
  }
  return _nutrients;
}



module.exports = {
  Schema : nutritionSchema,
  Model  : model,
}
