const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todo-api', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})