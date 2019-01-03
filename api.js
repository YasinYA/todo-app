const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Todo = require('./db/models/todo');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router
  .route('/all')
  .get((req, res) => {
    res.status(200);
    Todo.find({})
    .then(result => {
      res.send({
        todos: result
      });
    })
    .catch(err => {
      throw err;
    });
  });

router
  .route('/single/:id')
  .get((req, res) => {
    res.status(200);
    Todo.findById(req.params.id)
    .then(result => {
      res.send({
        todo: result
      });
    })
    .catch(err => {
      throw err;
    });
  })
  .put((req, res) => {
    if(!req.body.task) {
      res.send({
        success: false,
        message: 'Task is required'
      });
    } else {
      Todo.findOneAndUpdate({_id:req.params.id}, {task: req.body.task})
      .then(result => {
        res.send({
          success: true,
          message: 'Successfully Updated',
          todo: result
        });
      })
      .catch(err => {
        throw err;
      });
    }
  })
  .delete((req, res) => {
    Todo.deleteOne({_id:req.params.id})
    .then(todo => {
      res.send({
        success: true,
        message: 'Successfully Deleted'
      });
    })
    .catch(err => {
      throw err;
    });
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
      const todo = new Todo({
        task: req.body.task
      });
      
      todo.save()
      .then(result => {
        res.send({
          success: true,
          message: 'Successfully Added',
          todo
        });
      })
      .catch(err => {
        throw err;
      });
    }
  });


module.exports = router;