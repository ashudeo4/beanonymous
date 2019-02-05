const express=require("express");
const mongoose=require("mongoose");


const app=express();

const port=process.env.PORT || 3000;
app.get('/',(req,res)=>{
    res.send("hola");
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});