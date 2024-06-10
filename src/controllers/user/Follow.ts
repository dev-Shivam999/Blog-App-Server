import { Request, Response } from "express";
import { client } from "../..";

export const Follow = async (req: Request, res: Response) => {
    const val = req.header("Authorization"); // bloggerId
    const auth = req.header("Lol"); // userId

    const isFollowing = await client.follow.findFirst({
        where: {
            follow: Number(auth),
            follower:Number(val)
        },
    });
    
    

  try {
      if (!isFollowing) {
          // Create a new follow relationship from user to blogger
          await client.follow.create({
              data: {
                  follow: Number(auth),
                  follower: Number(val)
              },
          });
          
          res.json({ success: true, message: "Followed successfully" });
      } else {
          // Remove the follow relationship from user to blogger
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
    return res.json({success: false})
    
  }
};