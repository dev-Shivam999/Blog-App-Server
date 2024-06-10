import { Request, Response } from "express"
import { client } from "../.."

export const showPost = async (req: Request, res: Response) => {
    const { id } = req.params



    const posts = await client.blog.findFirst({
        where: { id: id }, 
        
         select: {
            avtar: true,
            content: true,
            title: true,
            created: true,
            id: true,
            authore: {
                select: {
                    name: true,
                    img: true,
                    id: true,
                }
            }
        }
    })

    
    return res.json({ success: true, data: posts })



}