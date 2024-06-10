import { Request, Response } from "express";
import { client } from "../..";

export const Profile = async (req: Request, res: Response) => {

    const val = req.header("Authorization")
    const auth = req.header("Lol")
    const location = req.header("Location")



    try {
        if (auth == undefined) {
            return res.json({ success: false, message: "login plz" })
        }


        if (auth == val) {
            return res.json({ success: true, message: true })
        }


        if (location == "BloggerProfile") {

            const user = await client.bloger.findFirst({
                where: {
                    id: Number(auth)
                },
                select: {
                    id: true,
                    name: true,
                    img: true,
                    blogs: true,
                    Followers: {
                        select: {
                            follow: true
                        }
                    },
                    Following: {
                        select: {
                            follow: true
                        }
                    }
}

            })



            if (!user) {
                return res.json({ success: false, message: "login plz" })

            }
            const data = user.Followers.some(p => p.follow == Number(val))
     
            res.json({ success: true, message: { user, data },   })
            
        }else{
            const user = await client.bloger.findFirst({
                where: {
                    id: Number(val)
                }, select: {
                    id: true,
                    name: true,
                    img: true,
                    blogs: true,
                    Followers: {
                        select: {
                            follow: true
                        }
                    },
                    Following: {
                        select:{
                            follower:true
                        }
                    }

                }

            })
            if (!user) {
                return res.json({ success: false, message: "login plz" })

            }

            res.json({ success: true, message: {user} })
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "plz try later" })

    }
}