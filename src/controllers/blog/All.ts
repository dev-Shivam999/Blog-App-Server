import { Request, Response } from "express";
import { client } from "../..";

export const All = async (req: Request, res: Response) => {

  let id: string | undefined = req.header("authorization")



  try {
    if (!id) {

      return res.json({ success: false })
    }
    const vali = await client.bloger.findUnique({
      where: {
        id: Number(id)
      }, select: {
        img: true
      }
    })
  if (!vali) {
    return res.json({success: false})
  }
    const blog = await client.blog.findMany({
      select: {
        avtar: true,
        content: true,
        title: true,
        created: true,
        id: true,
        authore: {
          select: {
            name: true, img: true,
            id: true

          }
        }, Likes: {
          
          select: {
            blogerId: true,
          }
        }

      }, orderBy: {
        Likes:{
          _count:"desc"
        }

      }
    })


    return res.json({ success: true, blogs: blog, vali: vali ? vali.img : vali })
  } catch (error) {
    console.log(error);
    return res.json({ success: false })

  }


}
