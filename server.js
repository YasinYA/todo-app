const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const db = require("./db/todos");

const port = 3000;

// make the app
const app = express();

// Middlewares
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get('/todos', (req, res) => {
  res.setHeader('Content-Type', 'Application/json');
  res.send(JSON.stringify(db.getAll()));
});

app.get('/todo/:id', (req, res) => {
  res.setHeader('Content-Type', 'Application/json');
  res.send(JSON.stringify(db.getOneTodo(req.params.id)));
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});