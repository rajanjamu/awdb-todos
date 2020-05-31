const Todo = require('../models/todos')

exports.getTodos = (req, res) => {
    Todo.find().then(foundTodos => {
        res.status(400).json(foundTodos)
    }).catch(err => {
        res.send(err)
    })
}

exports.createTodo = (req, res) => {
    Todo.create(req.body).then(newTodo => {
        res.status(201).json(newTodo)
    }).catch(err => {
        res.send(err)
    }) 
}

exports.getTodo = (req, res) => {
    Todo.findById(req.params.todoId).then(foundTodo => {
        if (!foundTodo) {
            res.json({ message: 'Oops! No todo found!' })
        } else {
            res.json(foundTodo)
        }
    }).catch(err => {
        res.send(err)
    })
}

exports.updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true })
        .then(updatedTodo => {
            res.json(updatedTodo)
        }).catch(err => {
            res.send(err)
        })
}

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoId)
        .then(() => {
            res.json({ message: 'Yay! Todo deleted!' })
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports = exports