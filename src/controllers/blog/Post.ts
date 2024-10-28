import { Request, Response } from "express";
import { Post } from "../../utils/types/types";
import { client } from "../..";
import RedisApi from "../../utils/redis/redis";

export const PostCreate = async (req: Request<{}, {}, Post>, res: Response) => {
    const  Post  = req.body
 
    
    
    
    const auth = req.header("Authorization")
    
  
    
    
    

    try {
        if (auth==undefined) {
            return res.json({success:false, message:"login first"})
        }
        
        let validation= await RedisApi.get("User")
       if (!validation) {
           const validation = await client.bloger.findMany({
             
               select:{
                id:true
               }
           })

           const user = validation.find((u) => u.id === Number(auth.toString()));
           await RedisApi.set("User", JSON.stringify(validation))
           if (user == null) {
               return res.json({ success: false, message: "login first" })

           }
       }
       else{
           validation = await JSON.parse(validation)
           validation = Array.isArray(validation) ? validation.find((p) => p.id === Number(auth.toString())) : null;

           if (validation == null) {
               return res.json({ success: false, message: "login first" })

           }
       }



        const daa = await client.blog.create({

            data: {
                title: Post.Title,
                
                content: Post.content,
                authoreId: Number(auth.toString()),
                avtar: Post.avtar,



            }, select: {
               
                id: true
            }

        })
        await RedisApi.del("Blogs")
        await RedisApi.del("User")
        await RedisApi.del("BloggerProfile")

        return res.json({ success: true ,message:daa.id})
    } catch (error) {
        console.log(error, "Error");
        return res.json({ success: false, })

    }

}