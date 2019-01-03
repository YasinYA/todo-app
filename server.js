const express = require('express');
const mongoose =  require('mongoose');

const apiRoutes = require('./api');
const dbConfig = require("./config");

const port = 3000;

// make the app
const app = express();

app.use('/api/', apiRoutes);

// connect to the database
mongoose.connect(
  dbConfig.url,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});