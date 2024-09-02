const { where } = require("sequelize");
const User = require("../models/authSchema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// Generate JWT Token
const generateToken = (data)=>{
    const payload = {id : data.id, username : data.username, email: data.email}
    return jwt.sign(payload, "testServer")
}
// compare password 
    const comparePassword = (plainPassword, hashedPassword) => {
        const isMatch = bcrypt.compareSync(plainPassword, hashedPassword)
        return !(!isMatch);
    }
   

exports.userRegister = async(req,res)=>{
    const {username,email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {username,email, password:hashedPassword}
        const user = await User.create(newUser)
        return res.status(200).json({msg : "User created successfully", data : user})
    }
    catch(err){
        console.error(err.message);
        return res.status(500).json({msg : "Server Error"})
    }
}

exports.userLogin = async(req, res)=>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({where : {username}})
        if(!user) return res.status(400).json({msg : "User not found"})
            
        // const isMatch = user.password === password;
       
        const isMatch = comparePassword(password, user.password)
        if(!isMatch) return res.status(400).json({msg : "Invalid credentials"})
        return res.status(200).json({msg : "User logged in successfully", token : generateToken(user), data :user})
    }
    catch(err){
        console.error(err.message);
        return res.status(500).json({msg : "Server Error"})
    }
}

exports.getAllUsers = async(req, res)=>{
    try{
        const data = await User.findAll()
        return res.status(200).json({data})
    }catch(err){
        console.error(err.message);
        return res.status(500).json({msg : "Server Error"})
    }
}
exports.getUserById = async(req, res)=>{
    const {id} = req.params;
    try{
        const data = await User.findOne({where: {id}})
        return res.status(200).json({data})
    }catch(err){
        console.error(err.message);
        return res.status(500).json({msg : "Server Error"})
    }
}

exports.updateUser = async(req, res)=>{
    const {email,username} = req.body;
    const {id} = req.params;
    try {
        const user = await User.findOne({where: {id}})
        if(!user) return res.status(404).json({msg : "User not found"})
        const updatedUser = {email, username}
        await User.update(updatedUser, {where : {id}})
        return res.status(200).json({msg : "User updated successfully", data : updatedUser})
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({msg : "Server Error"})
    }
}

