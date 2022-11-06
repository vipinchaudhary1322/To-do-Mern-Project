const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const usercontroller = require("./Routes/User")
const todocontroller = require("./Routes/Todolist")
const path=require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname+"/public")))

const Connection_Url = "mongodb://localhost:27017/fulltodoapp"
const Port = process.env.PORT || 5000;

mongoose.connect(Connection_Url).then(()=>{
    app.listen(Port,(err)=>{
        if(!err){
            console.log(`The Server running at ${Port}`)
        }
    })
}).catch((err)=>{
    console.log(err)
})


app.use("/user",usercontroller)
app.use("/todolist",todocontroller)