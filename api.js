const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const db = require("./db/todos");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router
  .route('/all')
  .get((req, res) => {
    res.status(200);
    res.send({
      todos: db.getAll()
    });
  });

router
  .route('/single/:id')
  .get((req, res) => {
    res.status(200);
    res.send({
      todo: db.getOneTodo(req.params.id)
    });
  })
  .put((req, res) => {
    if(!req.body.task) {
      res.send({
        success: false,
        message: 'Task is required'
      });
    } else {
      const todo = db.editTodo(req.params.id, req.body.task);
      res.send({
        success: true,
        message: 'Successfully Updated',
        todo
      });
    }
  })
  .delete((req, res) => {
    const todo = db.getOneTodo(req.params.id);
    if(!todo) {
      res.send({
        success: false,
        message: 'Todo not found'
      });
    } else {
      db.deleteTodo(req.params.id);
      res.send({
        success: true,
        message: 'Successfully Deleted'
      });
    }
  });

router
  .route('/create')
  .post((req, res) => {
    if(!req.body.task) {
      res.send({
        success: false,
        message: 'Task is required'
      });
    } else {
      const todo = db.createTodo(req.body.task);
      res.send({
        success: true,
        message: 'Successfully Added',
        todo
      });
    }
  });


module.exports = router;