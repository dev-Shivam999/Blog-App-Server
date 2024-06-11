import { Request, Response } from "express"
import { client } from "../.."

export const LikeCount = async (req: Request, res: Response) => {
    const id: { id: string } = req.body
    const userId = req.header('authorization')
    if (!userId) {
        return res.json({ success: false, message: false })
    }
    const user = await client.bloger.findFirst({
        where: {
            id: Number(userId),
        }, select: {
            Likes: true
        }

    })
    if (!user) {
        return res.json({ success: false, message: false })
    }
    const cl = await client.like.findFirst({
        where: {
            blogerId: Number(userId),
            blogId: id.id
        }

    })
    if (cl) {

        await client.like.deleteMany({
            where: {
                blogerId: Number(userId),
                blogId: id.id
            }
        })
        return res.json({ success: false, message: true })
    } else {
        await client.like.create({
            data: {
                blogerId: Number(userId),
                blogId: id.id,

                }
                })
            return res.json({ success: true, message: true })
    }




}