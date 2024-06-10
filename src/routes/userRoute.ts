
import express, { Request, Response, Router } from 'express';
import { PostCreate } from '../controllers/blog/Post';
import { showPost } from '../controllers/user/showPost';
import { update } from '../controllers/blog/update';
import { SignIn } from '../controllers/user/sign';
import { All } from '../controllers/blog/All';
import { Sign } from '../controllers/user/signUp';
import { Profile } from '../controllers/user/Profile';
import { client } from '..';
import { upload } from '../utils/multer/multer';
import { Follow } from '../controllers/user/Follow';
import { BlogDelete } from '../controllers/blog/BlogDelete';

export const routes:Router=express.Router()




routes.post('/All',All)


routes.post('/signup',upload.single("file"), SignIn)



routes.post('/post', upload.single("file"), PostCreate)


routes.post('/sign',Sign)

routes.put('/result/:id', showPost)

routes.get('/AllUser',async(req:Request,res:Response)=>{

    const data=await client.bloger.findMany()
    res.json({data})
})

routes.put('/update/:id', update)

routes.post('/profile',Profile)
routes.post('/follow',Follow)
routes.post('/BlogDelete', BlogDelete)