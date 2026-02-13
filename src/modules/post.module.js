const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        caption:{
            type:String,
            default:""
        },
        imgURL:{
            type:String,
            required:[true, "image url is required"]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:[true, "user id is required to create a post"]
        }

    }
)

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel;