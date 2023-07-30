
const express = require("express")
const app = express()
const fs = require("fs")

app.get("/",(req,res)=>{
    fs.readFile("./index2_1.html","utf8",(err,data)=>{
        res.send(data)
    })
})
app.get("/gethello",(req,res)=>{
    fs.readFile("./index2.html","utf8",(err,data)=>{
        res.send(data)
    })
   
})

app.listen(3000,()=>{
    log("server is running on port 3000")
})



