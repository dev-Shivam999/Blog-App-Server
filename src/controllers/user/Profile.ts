import { Request, Response } from "express";
import { client } from "../..";
import RedisApi from "../../utils/redis/redis";

export const Profile = async (req: Request, res: Response) => {

    const val = req.header("Authorization")
    const auth = req.header("Lol")
    const location = req.header("Location")



    try {
        if (location == "/Edits") {
            let user = await RedisApi.get("User")
            if (!user) {
                let ser = await client.bloger.findMany({

                    select: {
                        id: true,
                        name: true,
                        img: true,


                    }

                })
                await RedisApi.set("User", JSON.stringify(ser))
                const user = ser.find((u) => u.id === Number(val))
                return res.json({ success: true, message: user })
            }
            user = await JSON.parse(user)
            user = Array.isArray(user) ? user.find((p) => p.id === Number(val)) : null;
            return res.json({ success: true, message: user })
        }


        if (auth == undefined) {
            return res.json({ success: false, message: "login plz" })
        }


        if (auth == val) {
            return res.json({ success: true, message: true })
        }


        if (location == "BloggerProfile") {
            let use = await RedisApi.get("BloggerProfile")

            if (!use) {
                
                let user = await client.bloger.findMany({
                   
                    select: {
                        id: true,
                        name: true,
                        img: true,
                        blogs: {
                            select: {
                                authoreId: true,
                                avtar: true,
                                content: true,
                                title: true,

                                created: true,
                                id: true,


                                Likes: true
                            }
                        },
                        Followers: {
                            select: {
                                follow: true
                            }
                        },
                        Following: {
                            select: {
                                follow: true
                            }
                        },
                        

                    }

                })

                await RedisApi.set("BloggerProfile", JSON.stringify(user))
                user = user.filter(p => p.id == Number(auth))

                if (!user) {
                    return res.json({ success: false, message: "Not found" })

                }


                if (user[0].Followers.length > 0) {
                    const data = user[0].Followers.some(p => p?.follow == Number(val))
                   return res.json({ success: true, message: { user:user[0], data }, })
                }
                const data = false;
                return res.json({ success: true, message: { user: user[0], data }, })
            }
            use = await JSON.parse(use)
            const user = Array.isArray(use) ? use.find((p) => p.id === Number(auth)) : null
            const data = user.Followers.some((p: { follow: Number }) => p.follow == Number(val))

            res.json({ success: true, message: { user, data } })
        } else {
            
            const user = await client.bloger.findFirst({
                where: {
                    id: Number(val)
                }, select: {
                    id: true,
                    name: true,
                    img: true,
                    blogs: {
                        select: {
                            avtar: true,
                            content: true,
                            title: true,
                            created: true,
                            id: true,
                            authore: {
                                select: {
                                    name: true, img: true,
                                    id: true

                                }
                            }, Likes: {

                                select: {
                                    blogerId: true,
                                }
                            }
                        }
                    },
                    Followers: {
                        select: {
                            follow: true
                        }
                    },
                    Likes: {
                        select: {
                            blogId: true
                        }
                    },
                    Following: {
                        select: {
                            follower: true
                        }
                    }

                }

            })
            if (!user) {
                return res.json({ success: false, message: "login plz" })

            }

           return res.json({ success: true, message: { user } })
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "plz try later" })

    }
}