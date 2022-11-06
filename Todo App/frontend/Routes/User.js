const express = require("express")
const userschema = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const app = express.Router()

app.post("/signup",(req,res)=>{
    userschema.find({username: req.body.username}).then((data)=>{
        if(data.length){
            res.status(400).json("Username exit")
        }else{
           let salt = 10;
           bcrypt.genSalt(salt).then((result)=>{
              bcrypt.hash(req.body.password , result).then((hashpass)=>{
                  userschema.create({username : req.body.username , password : hashpass}).then((user)=>{
                     res.status(200).json("User Added")
                  }).catch((err)=>{
                    res.status(400).json("Network Issue")
                  })
              }).catch((err)=>{
                res.status(400).json("Process Issue")
              })
           }).catch((err)=>{
            res.status(400).json("Process Issue")
           })
        }
    }).catch((err)=>{
        res.status(400).json("Network Issue")
    })
})

app.post("/login",(req,res)=>{
    userschema.find({username:req.body.username}).then((data)=>{
        if(data.length){
          bcrypt.compare(req.body.password,data[0].password).then((result)=>{
            if(result){
               const token = jwt.sign({username:req.body.username},process.env.SECRET_KEY)
               res.status(200).json({authtoken : token})
            }else{
                res.status(400).json("Invalid Password")
            }
          })
        }else{
            res.status(400).json("Invalid Username")
        }
    }).catch((err)=>{
        res.status(400).json("Network Issue")
    })
})

app.put("/forgotpassword",(req,res)=>{
    userschema.find({username:req.body.username}).then((data)=>{
        if(data.length){
            let salt = 10;
            bcrypt.genSalt(salt).then((result)=>{
               bcrypt.hash(req.body.password , result).then((hashpass)=>{
                   userschema.updateOne({username : req.body.username} ,{$set : {password : hashpass} }).then((user)=>{
                      res.status(200).json("Password Updated")
                   }).catch((err)=>{
                     res.status(400).json("Network Issue")
                   })
               }).catch((err)=>{
                 res.status(400).json("Process Issue")
               })
            }).catch((err)=>{
             res.status(400).json("Process Issue")
            })
        }else{
            res.status(400).json("Invalid Username")
        }
    }).catch((err)=>{
        res.status(400).json("Network Issue")
    })
})


module.exports = app;