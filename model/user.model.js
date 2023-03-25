const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:String,
    pass:String,
    age:Number,
    city:String,
    mail:String,
    todos:[{type:mongoose.Schema.Types.ObjectId,ref:"todo"}]
},{
    versionKey:false
});

const userModel=mongoose.model("user",(userSchema));

module.exports={
    userModel
}