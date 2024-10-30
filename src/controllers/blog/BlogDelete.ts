import { Request, Response } from "express";
import { client } from "../..";
import RedisApi from "../../utils/redis/redis";

export const BlogDelete = async (req: Request, res: Response) => {
    const id = req.body

    const user = req.header("authorization")



    try {

        await client.blog.delete({
            where: {
                authoreId: Number(user),
                id: id.e
            }
        })
        await RedisApi.del("Blogs")
        await RedisApi.del("BloggerProfile")
        

        return res.json({ success: true })

    } catch (error) {
        console.log(error);
        return res.json({ success: false })

    }

}