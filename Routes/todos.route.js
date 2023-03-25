const express=require("express");
const {todoModle}=require("../model/todos.model");
const {userModel}=require("../model/user.model");
const {authenticate}=require("../mnidlleware/Authenticator")

const todos=express.Router();


//for getting all todos of perticular user ...
todos.get("/allTodos",authenticate,async(req,res)=>{
   // let data=await todoModle.find({userId:req.body.userId});
    let data=await userModel.findOne({_id:req.body.userId}).populate("todos")
    res.status(200).send({"msg":`here is all the data of the user ${data.name}`,data:data.todos})
})


//for posting the data for perticular user...
todos.post("/addTodos",authenticate,async(req,res)=>{
   let  newTodo=new todoModle(req.body);

   await newTodo.save().then(async(d,err)=>{
    if(d){
       // console.log(d);
        let data = await userModel.findOne({_id:req.body.userId});
        //console.log(data);
        data.todos.push(d._id);
        //console.log(data);
        await userModel.findByIdAndUpdate({_id:req.body.userId},{todos:data.todos});
        res.status(200).send({"msg":"Todos added succesfully"})
    }
    if(err){
        res.status(500).send({"msg":"Something went wrong try again"})
    }
   })
})


//for updataing the data of perticular user...

todos.patch("/update/:id",authenticate,async(req,res)=>{

    let data=await todoModle.findByIdAndUpdate({_id:req.params.id},req.body);
    res.status(200).send({"msg":"todo has been updated successfully"})
})


//for deleting the data of pertiuclar user...
todos.delete("/delete/:id",authenticate,async(req,res)=>{

    let data=await todoModle.findByIdAndDelete({_id:req.params.id});
    res.status(200).send({"msg":"todo has been deleted successfully"})
})
module.exports={
    todos
}