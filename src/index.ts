import express, { Express } from 'express';
import cors from 'cors';
import {  PrismaClient } from "@prisma/client"
import { routes } from './routes/userRoute';
import path from 'path';
import * as dotenv from 'dotenv'

export const client = new PrismaClient()
const app: Express = express();



app.use(cors())
app.use(express.json())
app.use('/uploads', express.static( './uploads/'))
app.use('/user',routes)



dotenv.config() // Load the environment variables









app.listen(3000, () => {
    console.log('listening on port 3000');

})



