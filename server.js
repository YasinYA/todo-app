const express = require('express');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');
const path = require("path");

const db = require("./db/todos");

const port = 3000;
const viewsPath =  path.join(__dirname + "/public/views");

// make the app
const app = express();

// set the templating engine
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Middlewares
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todos', (req, res) => {
  res.render('todos', {
    todos: db.getAll()
  });
});

app.get('/todo/:id', (req, res) => {
  res.render('todo', {
    todo: db.getOneTodo(req.params.id)
  });
});

app.get('/createtodo', (req, res) => {
  res.render('createTodo');
});

app.post('/createtodoapi', (req, res) => {
  db.createTodo(req.body.task);
  res.redirect('/todos');
});

app.get('/edittodo/:id', (req, res) => {
  const todo = db.getOneTodo(req.params.id);
  res.render('editTodo', { todo });
});

app.put('/edittodoapi', (req, res) => {
  db.editTodo(req.body.id, req.body.task);
  const url = `/todo/${req.body.id}`;
  res.redirect(url);
});

app.delete('/deletetodo/:id', (req, res) => {
  db.deleteTodo(req.params.id);
  res.redirect('/todos');
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});