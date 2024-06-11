import { Request, Response } from "express";
import { client } from "../..";

export const All = async (req: Request, res: Response) => {

  let id: string | undefined = req.header("authorization")




  try {
    if (!id) {

      id = "0"
    }
    const vali = await client.bloger.findUnique({
      where: {
        id: Number(id)
      }, select: {
        img: true
      }
    })
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

          }
        }, Link: {
          select: {
            blogerId: true,
          }
        }

      }, orderBy: {
       Link:{
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
