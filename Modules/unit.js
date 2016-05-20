function scale(amount, multiplier){
  var _amount = {
    unit    : amount.unit,
    quantity: multiplier * amount.quantity,
  }
  return _amount;
}

function sum(amount1, amount2){
  var _amount2  = convert(amount2, amount1.unit);
  var _amount   = {
    unit    : amount1.unit,
    quantity: amount1.quantity + _amount2.quantity,
  }
  return _amount;
}

function convert(amount, unit2){
  // gist of function: new_unit = unit2,
  //                   new_quantity = unit2/unit1 * old_quantity
  var unit1 = amount.unit;
  var multiplier = ratio(unit1,unit2);

  var _amount = {
    unit     : unit2,
    quantity : amount.quantity * multiplier,
  }
}


// returns ratio: unit2/unit1
function ratio(unit1, unit2){
  if (!(isWetUnit(unit1) === isWetUnit(unit2) &&
        isDryUnit(unit1) === isDryUnit(unit2))){
          throw new Error('units must be convertible to each other');
        }
  var ratio;
  if (isWetUnit(unit1)){
    // unit2/unit1 = (mL/unit1)/(mL/unit2)
    multiplier = mLPerUnit(unit1)/mLPerUnit(unit2);
  }
  else if (isDryUnit(unit1)){
    // unit2/unit1 = (g/unit1)/(g/unit2)
    multiplier = gPerUnit(unit1)/gPerUnit(unit2);
  }
  else {
    throw new Error('inappropriate units given');
  }

  return multiplier
}

function mLPerUnit(unit){
  switch(unit){
    case 'drop': return .05;
    case 'ml'  : return 1;
    case 'tsp' : return 5;
    case 'dsp' : return 10;
    case 'tbsp': return 15;
    case 'floz': return 30;
    case 'cup' : return 240;
    case 'pint': return 473.18;
    case 'qt'  : return 946.35;
    case 'gn'  : return 3785.41;
    default    : throw new Error('inappropriate unit given');
  }
}

function gPerUnit(unit){
  switch(unit){
    case 'mg'  : return 1/1000;
    case 'g'   : return 1;
    case 'oz'  : return 28;
    case 'lb'  : return 454;
    case 'kg'  : return 1000;
    default    : throw new Error('inappropriate unit given');
  }
}

function isDryUnit(unit){
  return (unit === 'mg' || unit === 'g' || unit === 'oz' ||
          unit === 'lb' || unit === 'kg');
}

function isWetUnit(unit){
  return (unit === 'drop' || unit === 'tsp' || unit === 'dsp' ||
          unit === 'tbsp' || unit === 'floz'|| unit === 'cup' ||
          unit === 'pint' || unit === 'qt'  || unit === 'gn');
}


module.exports = {
  scale,
  sum,
  convert,
  ratio,
}
