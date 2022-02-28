import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './services/mongodb/database';
import questionRoutes from './routes/questionRoutes'
import answerRoutes from './routes/answerRoutes'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3003

//database connection
database()

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use("/api/v1/question", questionRoutes)//this takes care of our question routes
app.use("/api/v1/answer", answerRoutes)//this takes care of our answer routes
app.use("/api/v1/auth", authRoutes)//this takes care of our auth routes

app.get("/", (req, res) => {
    res.send(`server up and perfectly running at ${port}`)
})  //this is just to see server is running

app.listen(port, (req, res) => {
    console.log(`Server listening at PORT ${port}`)
})