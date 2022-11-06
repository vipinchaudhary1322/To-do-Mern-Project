const express = require("express")
const todomodel = require("../Models/Todolist")
const usermodel = require("../Models/User")
const jwt = require("jsonwebtoken")
const app = express.Router()

app.get("/",(req,res)=>{
    const {username} = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
    usermodel.find({username : username}).then((data)=>{
        if(data.length){
           todomodel.find({username : username}).then((todolists)=>{
            res.status(200).json(todolists)
           }).catch((err)=>{
            res.status(400).json("Network Issue")
           })
        }else{
            res.status(400).json("Unauthorized User")
        }
    }).catch((err)=>{
        res.status(400).json("Network Issue")
    })
})

app.post("/addtodo",(req,res)=>{
    const {username} = jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
    usermodel.find({username : username}).then((data)=>{
        if(data.length){
           todomodel.find({username : username}).then((user)=>{
             if(user.length){
               todomodel.updateMany({username : username},{$push : {todolist : req.body}}).then((result)=>{
                res.status(200).json("Todo Added")
               }).catch((err)=>{
                res.status(400).json("Network Issue")
            })
             }else{
                todomodel.create({username : username , todolist : req.body}).then((result)=>{
                    res.status(200).json("Todo Added")
                }).catch((err)=>{
                    res.status(400).json("Network Issue")
                })
             }
           })
        }else{
            res.status(400).json("Unauthorized User")
        }
    }).catch((err)=>{
        res.status(400).json("Network Issue")
    })
})

module.exports = app;