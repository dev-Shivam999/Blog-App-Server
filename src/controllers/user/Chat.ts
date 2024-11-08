import { Request, Response } from "express";
import RedisApi from "../../utils/redis/redis";
import { client } from "../..";

export const Chat = async (req: Request, res: Response) => {
  const val = req.header("Authorization");
  const auth = req.header("Lol");

  try {
    let user = await RedisApi.get(`chat${val}:${auth}`);
    if (user) {
      user = await JSON.parse(user);
      return res.json({ success: true, message: user });
    }

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
      select: { content: true },
      orderBy: { content: { _count: "asc" } }
    });
    console.log(data);

    if (!data) {
      const newChat = await client.chat.create({
        data: {

        ReciveFrom: Number(val),
          SendTo: Number(auth),
        }
      });
      return res.json({ success: true, message: newChat });
    }

    return res.json({ success: true, message: data });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};
