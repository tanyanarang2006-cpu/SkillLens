const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registeruserController(req,res){
    const {username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json(
            {message:"All details are required"})
    }

    const userExists = await userModel.findOne({
        $or:[{username},{email}]
    })
    
    if(userExists){
        return res.status(400).json({
            message:"Account already exists"
        })
    }
    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie('token',token)

    res.status(201).json({
        message:"User registered successfully!!"
    })
}

module.exports = {
    registeruserController
}