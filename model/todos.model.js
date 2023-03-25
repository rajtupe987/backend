const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    name:String,
    status:{type:Boolean,default:false},
    userId:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
},{
    versionKey:false
});

const todoModle=mongoose.model("todo",todoSchema);

module.exports={
    todoModle
}