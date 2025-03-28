const express=require('express');
const UserRoute=express.Router()
const {userModel}=require('../Model/User')
UserRoute.get('/',async (req,res)=>{
    try {
         const data=await userModel.find()
         res.send({"data":data})


    } catch (error) {
        res.send({msg:error})
    }
})
UserRoute.post('/Register',async (req,res)=>{
    const data=req.body
    try {
         const newUser=new userModel(data)
         await newUser.save()
         res.send({res:'new user has been register'})


    } catch (error) {
        res.send({msg:error})
    }
})
UserRoute.post('/Login',async (req,res)=>{
    const data=req.body
    try {
      const finduser=await userModel.findOne({Email:data.Email})
      if(finduser){
        if(finduser.Password==data.Password){

            res.send({res:'login successful'})
        }
        else{
            res.send({res:"password not matched"})
        }
    }
      else res.send({msg:"no email found"})

    } catch (error) {
        res.send({msg:error})
    }
})

module.exports={UserRoute}