import { Request, Response } from "express";
import { client } from "../..";

export const Follow = async (req: Request, res: Response) => {
    const val = req.header("Authorization"); 
    const auth = req.header("Lol"); 




    if (!auth) {
        return res.json({success:false, message:"login plz"})
    }
  const u=  await client.bloger.findUnique({
        where:{
            id:Number(auth)
        }
    })
 if (u==null) {
    return res.json({success:false, message:"login plz"})
 }


    const isFollowing = await client.follow.findFirst({
        where: {
            follow: Number(auth),
            follower:Number(val)
        },
    });
    
    

  try {
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
    return res.json({success: false})
    
  }
};