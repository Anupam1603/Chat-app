import express from 'express'
import dotenv from 'dotenv'

import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()
const PORT = process.env.PORT || 6000

dotenv.config()

app.use(express.json()) // to parse the incoming rq from json payloads (req.body)

app.use("/api/auth", authRoutes)
app.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`Server is running at the port: ${PORT}`)
})