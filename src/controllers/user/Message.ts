import { Request, Response } from "express";
import { client } from "../..";
import RedisApi from "../../utils/redis/redis";

export const Message = async (req: Request, res: Response) => {
    const { id } = req.body

    const data = await client.chat.findMany({
        where: {
            OR: [
                {
                    ReciveFrom: Number(id)
                },
                {
                    SendTo: Number(id)
                }
            ]
        }, include: {
            sendTo: {
                select: {
                    img: true, name: true,
                },

            }, reciveFrom: {
                select: {
                    img: true, name: true,
                }
            },
         _count:{
            select:{
                content:true
            }
         }  
        }  

    })
    
  
    res.json({ success: true, data: data })
}