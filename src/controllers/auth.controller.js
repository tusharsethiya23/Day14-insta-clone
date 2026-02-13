
const bcrypt = require("bcryptjs");
const userModel = require("../modules/user.module");
const jwt = require("jsonwebtoken");


async function registerController(req,res){

    const { email, username, password, bio, profileImage} = req.body ;

    const hash = await bcrypt.hash(password,10)

    const isUserExist = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isUserExist){
        return res.status(409).json({
            message:"user already exists." + (isUserExist.email == email ? "user exists with this email address": "user exists with this username")
        })
    }

    const user = await userModel.create({
        email, username, password:hash, bio, profileImage
    })
 
    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,{expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            bio:user.bio,
            email: user.email,
            profileImage :user.profileImage
        }
    })

}

 async function loginController(req,res){
    const {email, username, password} = req.body;

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"no user exists."
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword){
        return res.status(400).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,{expiresIn:"1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message:"user logged in successfully.",
        
    })

}

module.exports = {
    registerController,loginController
}