const express = require("express");
const { userModel } = require("../model/user.model");
const { validator } = require("../mnidlleware/validator")
var jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")


const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    const data = await userModel.find();
    res.send(data)
})


//for posting user..
userRouter.post("/register", validator, async (req, res) => {

    const { name,
        pass,
        age,
        city,
        mail } = req.body;

    const email = await userModel.find({ email: mail });

    if (email.length > 0) {
        res.send({ "msg": "user alreay register plz login" })
    } else {
        try {

            bcrypt.hash(pass, 5, async (err, hash) => {

                if (err) {
                    res.send(({ "msg": "Sonmething went wrong" }))
                } else {
                    const app = new userModel({
                        name,
                        pass: hash,
                        age,
                        city,
                        mail
                    });
                    await app.save();
                    res.send(({ "mag": "New user created" }))
                }
            })
        } catch (error) {
            res.send(({ "msg": "Sonmething went wrong" }))
        }

    }
});


//for login perpose...
userRouter.post("/login", async (req, res) => {

    const { mail, pass } = req.body;
    try {

        const user = await userModel.find({ mail });
        user.length > 0 ? res.status(200).json({ "msg": "login succes", "token": jwt.sign({ "userId": user[0]._id }, 'raj') }) : res.status(400).json({ "msg": "login failed" })


        //  if(user.length>0){
        //     res.status(200).json({"msg":"login succes"})
        //  }else{
        //     res.status(400).json({"msg":"login failed"})
        //  }


    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }
});

module.exports = {
    userRouter
}