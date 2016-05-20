const express = require('express');
const app     = express();
const port    = process.env.PORT || 8080;
const server  = app.listen(port);

require('./routes.js')(app);

console.log("started on port: " + port);

/*
    TODO: Handle how the nutrition for a particular ingredient is based
          on a particular serving size. The nutrients need to be "scaled up"
          when the recipe calls for multiple servings (or fewer, for that matter)
          of the given ingredient.

    TODO: Step Schema.
*/
