const mongoose=require("mongoose");
require("dotenv").config()

const connection=mongoose.connect(process.env.port_url);

module.exports={
    connection
}