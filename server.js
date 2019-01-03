const express = require('express');

const apiRoutes = require('./api');
const db = require("./db/todos");

const port = 3000;

// make the app
const app = express();

app.use('/api/', apiRoutes);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});