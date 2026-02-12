const mongoose = require("mongoose")

 function connectDB (){
    mongoose.connect(process.env.MONGO_URI)
    .then(res=>{
        console.log("connected to MongoDB")
    })
 }

 module.exports = connectDB;