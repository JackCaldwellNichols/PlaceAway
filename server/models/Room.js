import mongoose from "mongoose"

const roomSchema = mongoose.Schema({
    longitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    price: {type: Number, min:0, max: 50, default: 0, required: true},
    title: {type: String, minLength: 5, maxLength: 150, required: true},
    description: {type: String, minLength: 6, maxLength: 1000, required: true},
    images: {type: [String], validate: (v)=>Array.isArray(v) && v.length>0},
    uid: {type: String, required: true},
    username: {type: String, required: true},
    userimage: {type: String, default: ''},
})

const Room = mongoose.model('rooms', roomSchema)

export default Room