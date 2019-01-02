const _ = require('lodash');

const todos = [
  {
    id: "1",
    task: "Clean the house"
  },
  {
    id: "2",
    task: "Code"
  },
  {
    id: "3",
    task: "Make a coffee"
  },
  {
    id: "4",
    task: "Cook Lunch"
  },
  {
    id: "5",
    task: "Go to GYM"
  },
  {
    id: "6",
    task: "Take a nap"
  },
  {
    id: "7",
    task: "Call the boss"
  },
  ,
  {
    id: "8",
    task: "Meeting"
  },
  {
    id: "9",
    task: "Client Call"
  },
  {
    id: "10",
    task: "Prepare tomorrow's todo list"
  }
];

const db = {
  getAll: function() {
    return todos;
  },
  getOneTodo: function(id) {
    return _.find(todos, {id: id});
  },
  createTodo: function(todo) {
    todos.push(todo);
    return todos;
  },
  deleteTodo: function(id) {
    _.remove(todos, {id: id});
  },
  editTodo: function(id, task) {
    let index = _.findIndex(todos, {id: id});

    todos.splice(index, 1, {id: id, task: task});
    return _.find(todos, {id: id});
  }
};

module.exports = db;