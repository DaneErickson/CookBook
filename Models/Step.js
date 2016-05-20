"use strict";
const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;

const stepSchema = mongoose.Schema({
  step : String,
});

module.exports = {
  Schema : stepSchema,
  Model  : mongoose.model('Step', stepSchema),
}
