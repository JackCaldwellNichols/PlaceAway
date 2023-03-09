import express from 'express'
import dotenv from 'dotenv'
import roomRouter from './routes/roomRouter.js'
import userRouter from './routes/userRouter.js'
import mongoose from 'mongoose'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
})

app.use(express.json({limit: '10mb'}))
app.use('/room', roomRouter)
app.use('/user', userRouter)
app.get('/', (req, res)=>{
    res.json({message: 'Welcome to the API'})
})

app.use((req, res)=>res.status(404).json({success:false, message: 'Not found'}))

const startServer = async () => {
    try {
        //connect to MongoDB
        await mongoose.connect(process.env.MONGO_CONNECT)
        console.log("MONGO")
        app.listen(port, ()=> {
            console.log(`Server listening on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()