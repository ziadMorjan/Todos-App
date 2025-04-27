const Todo = require("../models/Todo");
const CustomError = require("../utils/CustomError");
const { asyncErrorHandler } = require("./ErrorController");

let getTodos = asyncErrorHandler(async function (req, res) {
    let todos = await Todo.find();

    res.status(200).json({
        status: "success",
        count: todos.length,
        data: {
            todos
        }
    });
});

let createTodo = asyncErrorHandler(async function (req, res) {
    let newTodo = await Todo.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newTodo
        }
    });
});

let getTodo = asyncErrorHandler(async function (req, res) {
    let todo = await Todo.findById(req.params.id);

    if (!todo)
        throw new CustomError(`There is no todo with the id: ${req.params.id}`, 404);

    res.status(201).json({
        status: "success",
        data: {
            todo
        }
    });
});

let updateTodo = asyncErrorHandler(async function (req, res) {
    let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });

    if (!updatedTodo)
        throw new CustomError(`There is no todo with the id: ${req.params.id}`, 404);

    res.status(200).json({
        status: "success",
        data: {
            updatedTodo
        }
    });
});

let deleteTodo = asyncErrorHandler(async function (req, res) {
    let deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo)
        throw new CustomError(`There is no todo with the id: ${req.params.id}`, 404);

    res.status(204).json({
        status: "success",
        data: null
    });
});

module.exports = {
    getTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}