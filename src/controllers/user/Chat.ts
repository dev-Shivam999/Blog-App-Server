import { Request, Response } from "express";
import RedisApi from "../../utils/redis/redis";
import { client } from "../..";
import { send } from "process";

export const Chat = async (req: Request, res: Response) => {
  const val = req.header("Authorization");
  const auth = req.header("Lol");

  try {
   

    const sender = await client.bloger.findUnique({ where: { id: Number(val) } });
    const receiver = await client.bloger.findUnique({ where: { id: Number(auth) } });

    if (!sender || !receiver) {
      console.log(auth, receiver);

      return res.json({ success: false, message: "Sender or receiver not found." });
    }

    const data = await client.chat.findFirst({
      where: {
        OR: [
          { ReciveFrom: Number(val), SendTo: Number(auth) },
          { ReciveFrom: Number(auth), SendTo: Number(val) },
        ]
      },
      select: { SendTo:true, content: true, sendTo: { select: { img: true, name: true } }, reciveFrom:{select:{img:true,name:true}}},
      orderBy: { content: { _count: "asc" } }
    });

    if (!data) {
      const newChat = await client.chat.create({
        data: {

        ReciveFrom: Number(val),
          SendTo: Number(auth),
        }, select: { SendTo: true, content: true, sendTo: { select: { img: true, name: true } }, reciveFrom: { select: { img: true, name: true } } },
       
      });
      return res.json({ success: true, message: newChat.content, sendTo: newChat.SendTo != Number(auth) ? newChat.sendTo : newChat.reciveFrom });
 }

    return res.json({ success: true, message: data.content, sendTo: data.SendTo != Number(auth)?data.sendTo:data.reciveFrom });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
