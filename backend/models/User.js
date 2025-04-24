const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

let userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required field"],
            minlength: [3, "name length must be longer than 3 characters"]
        },
        email: {
            type: String,
            required: [true, "name is required field"],
            uniqe: [true, "Email must be uniqe"],
            validator: {
                validate: validator.isEmail,
                message: "please enter valid email"
            }
        },
        password: {
            type: String,
            required: [true, "password is required field"],
            minlength: [8, "password length must be longer than 8 characters"]
        },
        confirmPassword: {
            type: String,
            required: [true, "password is required field"],
            minlength: [8, "password length must be longer than 8 characters"],
            validator: {
                validate: function (val) {
                    return this.password == val;
                },
                message: "password and confirm password is not match"
            }
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        active: {
            type: Boolean,
            default: true,
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
        passwordChangedAt: Date,
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcryptjs.hashSync(this.password, 10);
    this.confirmPassword = undefined;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

module.exports = mongoose.model("User", userSchema);
