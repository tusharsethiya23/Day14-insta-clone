const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "username not available."],
        required:[true, "username is required."]
    },
    email:{
        type:String,
        unique:[true, "user already exists with this email address."],
        required:[true, "email is required."]
    },
    password:{
        type:String,
        required:[true, "password is required."]
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/tusharsethiya023/defaultProfile2.png"
    },
    bio:String
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;