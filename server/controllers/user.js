import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Room from '../models/Room.js'

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(password.length < 6) return res.status(400).json({success:false, message: "Password must have more than 6 characters"})
        const emailToLower = email.toLowerCase()
        const userExists = await User.findOne({email:emailToLower})
        if(userExists){
            return res.status(400).json({sucess: false, message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            name,
            email:emailToLower,
            password:hashedPassword
        })
        const {_id:id, photoURL} = user
        const token = jwt.sign({id, name, photoURL}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(201).json({success: true, result: {id, name, email:user.email, photoURL, token}})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Something went wrong"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const emailToLower = email.toLowerCase()
        const userExists = await User.findOne({email:emailToLower})
        if(!userExists){
            return res.status(404).json({sucess: false, message: "User not found"})
        }
        const correctPassword = await bcrypt.compare(password, userExists.password)
        if(!correctPassword) return res.status(400).json({success:false, message: 'Incorrect username or password'})
    
        const {_id:id, name, photoURL} = userExists
        const token = jwt.sign({id, name, photoURL}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({success: true, result: {id, name, emailToLower, photoURL, token}})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Something went wrong"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {new: true})
        const {_id:id, name, photoURL} = updateUser

        await Room.updateMany({uid:id}, {username: name, userimage: photoURL})

        const token = jwt.sign({id, name, photoURL}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({success: true, result:{name, photoURL, token}})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Something went wrong"})
    }
}