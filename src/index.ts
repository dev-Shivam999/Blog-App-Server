import express, { Express } from 'express';
import cors from 'cors';
import {  PrismaClient } from "@prisma/client"
import { routes } from './routes/userRoute';
import path from 'path';


export const client = new PrismaClient()
const app: Express = express();



app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/user',routes)












app.listen(3000, () => {
    console.log('listening on port 3000');

})


