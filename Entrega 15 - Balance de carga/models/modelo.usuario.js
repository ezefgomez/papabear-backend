const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        max: 50
    }
})

module.exports = mongoose.model("Users", UsersSchema)