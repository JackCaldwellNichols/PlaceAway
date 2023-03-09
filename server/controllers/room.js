import Room from "../models/Room.js"


export const createRoom = async(req, res)=> {
    try {
        const {id:uid, name:username, photoURL: userimage} = req.user
        const newRoom = new Room({...req.body, username, userimage, uid})
        await newRoom.save()
        res.status(201).json({success: true, result:newRoom})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Something went wrong"})
    }
}

export const getRooms = async(req, res) => {
    try {
        const rooms = await Room.find().sort({_id:-1})
        res.status(200).json({success: true, result:rooms})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Something went wrong"})
    }
}