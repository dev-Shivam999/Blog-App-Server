import {  Request, Response } from "express"
import { client } from "../.."
import RedisApi from "../../utils/redis/redis"

export const LikeCount = async (req: Request, res: Response) => {
    const id: { id: string } = req.body

    

    const userId = req.header('authorization')
   try {
       if (!userId) {
           return res.json({ success: false, message: false })
       }

      
           let user = await client.bloger.findFirst({
            where:{
                id:Number(userId)
            },
               select: { id: true, img: true },
           });

           if (!user) {
               return res.json({ success: false, message: false })
           }
       
     
       await RedisApi.del("Blogs")
       await RedisApi.del("User")

       await RedisApi.del("BloggerProfile")
       const cl = await client.like.findFirst({
           where: {
               blogerId: Number(userId),
               blogId: String(id.id)
           }

       })
       if (cl) {

           await client.like.deleteMany({
               where: {
                   blogerId: Number(userId),
                   blogId: String(id.id)
               }
           })
           return res.json({ success: false, message: true })
       } else {
           await client.like.create({
               data: {
                   blogerId: Number(userId),
                   blogId: id.id,

               },
              
           })
           return res.json({ success: true, message: true })
       }



   } catch (error) {
    console.log(error);
    
return res.json({error: false})    
   }

}