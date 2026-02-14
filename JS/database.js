const mongoose = require("mongoose");

// STEP 1 - Connection String
mongoose.connect(
  // Use your own connection string here. Make sure the database name is AuthApp
  "", { })
    .then(() => console.log("Connected"))
    .catch(err => console.log(err))