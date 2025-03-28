const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    Name:{type:String,unique:true,required:true},
    Email:String,
    Password:String,
})


const userModel=mongoose.model("user",UserSchema)

module.exports={userModel}