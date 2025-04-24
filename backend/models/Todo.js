const mongoose = require("mongoose");
const validator = require("validator");

const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required field"],
            minlength: [3, "name length must be longer than 3 characters"]
        },
        description: {
            type: String,
            required: [true, "description is required field"],
            minlength: [3, "description length must be longer than 3 characters"]
        },
        done: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);