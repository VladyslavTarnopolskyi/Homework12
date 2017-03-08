'use strict';

const express = require('express'),

    Todo = require('./model'),

    router = express.Router();

router.get('/todo', (req, res, next) => {

    Todo.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(next);
});

router.post('/todo', (req, res, next) => {
    new Todo(req.body.todo)
        .save()
        .then(todo => {
            console.log(req.body.todo);
            res.json(todo);
        })
        .catch(next);
});
router.delete('/todo/:todo_id', (req, res, next) => {
    Todo.remove({
        _id: req.params.todo_id
    },
        function (err) {
        if (err) {
            res.send(err);
        }
    })
        .catch(next);
});



router.put('/todo/:todo', (req, res) =>{
    var todoItem = req.params.todo;
    console.log(req.params);
    console.log(req.body);
    Todo.update({
        item: todoItem
    },{
        item: req.body.todo.item
    },
        function(err, todo) {
        if (!err) {
            res.json(todo);
        } else {
            res.write("fail");
        }
    });
});

module.exports = router;
