const path = require("path");

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');
const favicon = require('express-favicon');

const db = require("./db/todos");

const port = 3000;
const viewsPath =  path.join(__dirname + "/views");
const publicPath =  path.join(__dirname + "/public");
const faviconPath =  path.join(__dirname + "/public/img/favicon.ico");

// make the app
const app = express();

// set the templating engine
app.set('views', viewsPath);
app.set('view engine', 'ejs');

// Middlewares
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static files
app.use('/static/', express.static(publicPath));

// favicon
app.use(favicon(faviconPath));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/todo/all', (req, res) => {
  res.render('todos', {
    todos: db.getAll()
  });
});

app.get('/todo/single/:id', (req, res) => {
  res.render('todo', {
    todo: db.getOneTodo(req.params.id)
  });
});

app.get('/todo/create', (req, res) => {
  res.render('createTodo');
});

app.post('/todo/createtodo', (req, res) => {
  db.createTodo(req.body.task);
  res.redirect('/todo/all');
});

app.get('/todo/edit/:id', (req, res) => {
  const todo = db.getOneTodo(req.params.id);
  res.render('editTodo', { todo });
});

app.put('/todo/edittodo', (req, res) => {
  db.editTodo(req.body.id, req.body.task);
  const url = `/todo/single/${req.body.id}`;
  res.redirect(url);
});

app.delete('/todo/delete/:id', (req, res) => {
  db.deleteTodo(req.params.id);
  res.redirect('/todo/all');
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});