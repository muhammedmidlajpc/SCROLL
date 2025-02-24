const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userModel=require('../models/user.model')
const { json } = require('express')
const User=require("../models/user.model")

module.exports.signup=async(req,res)=>{

    console.log(req.body)

    try {
        const User=req.body
        const user= await userModel.findOne({email:User.email})
        console.log(user)
        if (user) {
            res.status(400).json({message:"User already",user})
        }else{
            await userModel.create(User)
            res.status(201).json({message:"SIGNUP Success",User})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports.signin=async(req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    const user=await User.findOne({email:email})
    console.log(user)
    if(user){
        const auth=bcrypt.compare(password,user.password)
        console.log(auth)
        if(auth){
            // const secret=process.env.JWT_SECRET
            // const token=jwt.sign()
            res.status(200).json({message:"Sign in success",data:user})
        }else{
            res.status(401).json({message:"Invalid password"})
        }
        
    }else{
        res.status(404).json({message:"User not found"})
    }

}