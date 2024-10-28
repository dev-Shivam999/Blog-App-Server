import { Request, Response } from "express";
import { client } from "../..";
import RedisApi from "../../utils/redis/redis";

export const Follow = async (req: Request, res: Response) => {
    const val = req.header("Authorization");
    const auth = req.header("Lol");




    if (!auth) {
        return res.json({ success: false, message: "login plz" })
    }


    const user = await client.bloger.findFirst({
        where: {
            id: Number(auth)
        },
        select: {
            id: true
        }
    })
   
    if (user == null) {
        return res.json({ success: false, message: "login plz" })
    }





    const isFollowing = await client.follow.findFirst({
        where: {
            follow: Number(auth),
            follower: Number(val)
        },
    });



    try {
        await RedisApi.del("BloggerProfile")
        if (!isFollowing) {
            await client.follow.create({
                data: {
                    follow: Number(auth),
                    follower: Number(val)
                },
            });

            res.json({ success: true, message: "Followed successfully" });
        } else {
            await client.follow.deleteMany({
                where: {
                    follow: Number(auth),
                    follower: Number(val),
                },
            });
            res.json({ success: true, message: "Unfollowed successfully" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false })

    }
};