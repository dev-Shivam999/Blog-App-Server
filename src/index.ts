import express, { Express } from 'express';
import cors from 'cors';
import {  PrismaClient } from "@prisma/client"
import { routes } from './routes/userRoute';
import * as dotenv from 'dotenv'

export const client = new PrismaClient()
const app: Express = express();



app.use(cors())
app.use(express.json())

app.use('/user',routes)
dotenv.config() 
app.listen(3000, () => {
    console.log('listening on port 3000');

})



