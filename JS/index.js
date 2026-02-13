const express = require("express");
const database = require("./database.js");
const wikiRoutes = require("./routes/wiki.js");

const app = express();

app.use(express.json({limit: '5mb'}));
app.use(express.static("./public"));



const mongoose = require("mongoose");

app.use("/api/wiki", wikiRoutes);

app.listen(3000, () => console.log("Server Started on port 3000."));