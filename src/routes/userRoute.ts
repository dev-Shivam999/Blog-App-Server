
import express, { Request, Response, Router } from 'express';
import { PostCreate } from '../controllers/blog/Post';
import { showPost } from '../controllers/user/showPost';
import { update } from '../controllers/blog/update';
import { SignIn } from '../controllers/user/sign';
import { All } from '../controllers/blog/All';
import { Sign } from '../controllers/user/signUp';
import { Profile } from '../controllers/user/Profile';
import { client } from '..';
import { Follow } from '../controllers/user/Follow';
import { BlogDelete } from '../controllers/blog/BlogDelete';
import { LikeCount } from '../controllers/blog/Like';
import { EditsProfile } from '../controllers/user/EditsProfile';
import { Chat } from '../controllers/user/Chat';
import { Message } from '../controllers/user/Message';
import { UserSearch } from '../controllers/user/UserSearch';

export const routes:Router=express.Router()




routes.post('/All',All)



routes.post('/signup', SignIn)



routes.post('/post',  PostCreate)


routes.post('/sign',Sign)

routes.put('/result/:id', showPost)

routes.get('/AllUser',async(req:Request,res:Response)=>{

    const data=await client.bloger.findMany({
        where:{
            id:1
        },
        select:{
            blogs:true
        }
    })
    res.json({data:data?data:"lol"})
})

routes.put('/update/:id', update)

routes.post('/profile',Profile)
routes.post('/EditsProfile', EditsProfile)
routes.post('/follow',Follow)
routes.post('/BlogDelete', BlogDelete)
routes.post('/Link', LikeCount)
routes.post('/Chat', Chat)
routes.post('/ChatRoom', Message)
routes.put('/UserSearch/:id', UserSearch)