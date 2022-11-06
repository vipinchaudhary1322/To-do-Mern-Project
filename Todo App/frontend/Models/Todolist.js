const mongoose = require("mongoose")

const todoschema = new mongoose.Schema({
    todolist : [{
        activity : String,
        status : String,
        time : String
    }
    ],
    username: String
})

const todomodel = mongoose.model("/todolists",todoschema)
module.exports = todomodel