$(document).ready(() => {
    $.getJSON('/api/todos')
        .then(addTodos)
    
    $('#todoInput').keypress((event) => {
        if (event.which == 13) {
            createTodo()
        }
    })

    $('.list').on('click', 'li', function() {
        updateTodo($(this))
    })

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation()
        removeTodo($(this).parent())
    })
})

function addTodos(todos) {
    todos.forEach(addTodo)
}

function addTodo(todo) {
    const newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
    newTodo.data('id', todo._id)
    newTodo.data('completed', todo.completed)
    if (todo.completed) newTodo.addClass('done')
    $('.list').append(newTodo)
}

function createTodo() {
    const usrInput = $('#todoInput').val()
    $.post('/api/todos', { name: usrInput })
        .then(newTodo => {
            $('#todoInput').val('')
            addTodo(newTodo)
        }).catch(err => {
            console.log(err)
        })
}

function removeTodo(todo) {
    const deleteUrl = '/api/todos/' + todo.data('id')
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    }).then(data => {
        todo.remove()
    }).catch(err => {
        console.log(err)
    })
}

function updateTodo(todo) {
    const updateUrl = '/api/todos/' + todo.data('id')
    const isDone = !todo.data('completed')
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: { completed: isDone }
    }).then(updatedTodo => {
        todo.toggleClass('done')
        todo.data('completed', isDone)
    }).catch(err => {
        console.log(err)
    })
}