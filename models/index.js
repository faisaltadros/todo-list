var mongoose = require('mongoose');
mongoose.set('debug', true);

// mongoose.connect('mongodb://localhost/todo-api-1', { useNewUrlParser: true });
mongoose.connect("mongodb+srv://faisal1234:faisal2345@cluster0-ub6wn.mongodb.net/todo-api?retryWrites=true", { useNewUrlParser: true });



mongoose.Promise = Promise;

module.exports.Todo = require("./todo");