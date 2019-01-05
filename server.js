const path = require("path");

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride =  require('method-override');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('express-flash-messages');
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

// App Config
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// static files
app.use('/static/', express.static(publicPath));

// favicon
app.use(favicon(faviconPath));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/all', (req, res) => {
  res.render('todos', {
    todos: db.getAll()
  });
});

app.get('/single/:id', (req, res) => {
  res.render('todo', {
    todo: db.getOneTodo(req.params.id)
  });
});

app.get('/create', (req, res) => {
  const messages = res.locals.getMessages();
  if(messages.error) {
    res.render('createTodo', { messages: messages.error });
  }
  else {
    res.render('createTodo', { messages: {}});
  }
});

app.post('/createtodo', (req, res) => {
  // Validations
  req.checkBody('task', 'Task is required').notEmpty();

  // Validation results
  req.getValidationResult()
    .then(result => {
      if (result.isEmpty() === false) {
        result.array().forEach(error => {
          req.flash('error', error.msg);
        });
        res.redirect('/create');
      }
      else {
        db.createTodo(req.body.task);
        res.redirect('/all');
      }

    });
});

app.get('/edit/:id', (req, res) => {
  const messages = res.locals.getMessages();
  const todo = db.getOneTodo(req.params.id);

  if(messages.error) {
    res.render('editTodo', { todo, messages:messages.error });
  } else {
    res.render('editTodo', { todo , messages: {}});
  }
});

app.put('/edittodo/:id', (req, res) => {
  // Validation
  req.checkBody('task', 'Task is required').notEmpty();

  // Validation Results
  req.getValidationResult()
    .then(result => {
      if(result.isEmpty() === false) {
        result.array().forEach(error => {
          req.flash('error', error.msg);
        });
        res.redirect('/edit/' + req.params.id);
      } else {
        db.editTodo(req.params.id, req.body.task);
        const url = `/single/${req.params.id}`;
        res.redirect(url);
      }
    });
});

app.delete('/delete/:id', (req, res) => {
  db.deleteTodo(req.params.id);
  res.redirect('/all');
});


// 404 500 Errors
app.use((req, res, next) => {
  res.status(404)
  res.render('404');
});
app.use((req, res, next) => {
  res.status(500)
  res.render('500');
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});