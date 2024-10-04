import { Request, Response } from "express";
import { Post } from "../../utils/types/types";
import { client } from "../..";

export const PostCreate = async (req: Request<{}, {}, Post>, res: Response) => {
    const  Post  = req.body
    console.log(Post);
    
    
    
    const auth = req.header("Authorization")
    
  
    
    
    

    try {
        if (auth==undefined) {
            return res.json({success:false, message:"login first"})
        }
        
        const validation= await client.bloger.findFirst({
            where:{
                id: Number(auth.toString())
            }
        })
        
        if (validation==null) {
            return res.json({success:false, message:"login first"})
            
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
        return res.json({ success: true ,message:daa.id})
    } catch (error) {
        console.log(error, "Error");
        return res.json({ success: false, })

    }

}