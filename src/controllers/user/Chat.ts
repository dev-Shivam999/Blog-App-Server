import { Request, Response } from "express";
import RedisApi from "../../utils/redis/redis";
import { client } from "../..";

export const Chat = async (req: Request, res: Response) => {
  const val = req.header("Authorization");
  const auth = req.header("Lol");


  try {

    let user = await RedisApi.get(`chat${val}:${auth}`)
    if (user) {
      user = await JSON.parse(user)
      return res.json({ success: true, message: user })

    }
    const data = await client.chat.findFirst({
      where: {
        OR: [
          {
            ReciveFrom: Number(val),
            SendTo: Number(auth),
          }, {
            ReciveFrom: Number(auth),
            SendTo: Number(val),
          }
        ]
      },
      select: {
        content: true
      },
      orderBy: { content: "asc" }

    })
    if (data == null) {
      await client.chat.create({
        data: {
          content: [], ReciveFrom: Number(val), SendTo: Number(auth)
        }
      })
      return res.json({ success: true, message: data })
    }
    // const serializedMessages = data.content.map(async (msg) =>
    //   await RedisApi.rPush(`chat:${val}:${auth}`,
    //     JSON.stringify(msg))
    // );

    return res.json({ success: true, message: data })



  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error })

  }
}
