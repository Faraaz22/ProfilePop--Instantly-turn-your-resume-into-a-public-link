import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'
import usersRouter from './routes/users'
import resumesRouter from './routes/resumes'
import viewsRouter from './routes/views'
// import paymentsRouter from './routes/payments'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT =4000

app.use(cors())
app.use(express.json())


app.use('/users', usersRouter)
app.use('/resumes', resumesRouter)
app.use('/views', viewsRouter)
// app.use('/payments', paymentsRouter)


app.get('/check',(req,res)=>res.send('API Running'))
app.listen(PORT, ()=> {
    console.log("server lIstening");
    
})
