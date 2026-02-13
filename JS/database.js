const mongoose = require("mongoose");

// STEP 1 - Connection String
mongoose.connect(
  // Use your own connection string here. Make sure the database name is AuthApp
  "mongodb+srv://cs157:cs157@cs157.vxnjgll.mongodb.net/Wiki?retryWrites=true&w=majority", { })
    .then(() => console.log("Connected"))
    .catch(err => console.log(err))