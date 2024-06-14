import { Request, Response } from "express"
import { client } from "../.."

export const update = async (req: Request, res: Response) => {
    const { Post } = req.body
    const { id } = req.params
    
 try {
     const up = await client.blog.update({
         where: { id: id, authoreId: Number(Post.authorId) },
         data: {
             title: Post.Title,
             content: Post.content
         }, select: {
             title: true, content: true,
         }
     })
     return res.json({ success: true, data: up })
    } catch (error) {
        console.log(error);
        return res.json({ success: true, data: error })

    
 }

}