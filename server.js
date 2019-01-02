const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const port = 3000;

// make the app
const app = express();

// Middlewares
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});