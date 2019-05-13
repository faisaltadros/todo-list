$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos)

    $('#todoInput').keypress(function (event) {
        if (event.which == 13) {
            if($(this).val() !== "") {
                createTodo();
                trash();
            }
        }
    });

    $('.list').on('click', '.text', function () {
        updateTodo($(this));
    })

    $('.list').on('click', '.trash', function (e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    })
    trash();
});

$(".fa-chevron-circle-down").click(function () {
    $("input[type='text']").fadeToggle();
});

function addTodos(todos) {
    // add todos to page here
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<div class="entry"><div class="trash"><i class="fa fa-trash" aria-hidden="true"></i></div><div class="text">' + todo.name + '</div></div>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed)
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $(".list").prepend(newTodo);
    trash();
}

function createTodo() {
    // send request to create new todo
    var userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
        .then(function (newTodo) {
            addTodo(newTodo);
            $('#todoInput').val('');
        })
        .catch(function (err) {
            console.log(err);
        })
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
        .then(function (data) {
            todo.remove();
        })
        .catch(function (err) {
            console.log(err);
        })
}

function updateTodo(todo) {
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = { completed: isDone }
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
        .then(function (updatedTodo) {
            todo.toggleClass("done");
            todo.data('completed', isDone);
        })
        .catch(function (err) {
            console.log(err);
        })
}

function trash() {
    var entryHeight = $(".entry").first().css("height");
	$(".fa-trash").first().css("lineHeight", entryHeight);
};