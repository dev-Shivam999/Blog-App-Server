import { Request, Response } from "express"
import { client } from "../.."
import RedisApi from "../../utils/redis/redis"

export const showPost = async (req: Request, res: Response) => {
    const { id } = req.params

let posts=await RedisApi.get("Blogs")

   if (!posts) {
       const posts = await client.blog.findMany({
          
           select: {
               avtar: true,
               content: true,
               title: true,
               created: true,
               id: true,
               authore: {
                   select: { name: true, img: true, id: true },
               },
               Likes: {
                   select: { blogerId: true },
               },
           },
           orderBy: {
               Likes: {
                   _count: "desc",
               },
           }
       })


       if (!posts) {
           return res.json({ success: false })
       }
       RedisApi.set("Blogs",JSON.stringify(posts))
       return res.json({ success: true, data: posts })
   }
   posts = await JSON.parse(posts)
    posts = Array.isArray(posts) ? posts.find((p) => p.id ===id) : null;
   

    if (!posts) {
        return res.json({ success: false })
    }
    return res.json({ success: true, data: posts })

}