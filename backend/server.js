import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"


import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()
const PORT = process.env.PORT || 6000

dotenv.config()

app.use(express.json()) // to parse the incoming rq from json payloads (req.body)
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`Server is running at the port: ${PORT}`)
})