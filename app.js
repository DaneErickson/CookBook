"use strict";

const express = require('express');
const app     = express();
const port    = process.env.PORT || 8080;
const server  = app.listen(port);

require('./Models/Recipe.js');

console.log("started on port: " + port);

/*
    TODO: Step Schema.
*/
