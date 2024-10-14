import { Request, Response } from "express";
import { client } from "../..";

export const Profile = async (req: Request, res: Response) => {

    const val = req.header("Authorization")
    const auth = req.header("Lol")
    const location = req.header("Location")



    try {
        if (location == "/Edits") {
            const user = await client.bloger.findFirst({
                where: {
                    id: Number(val)
                },
                select: {

                    name: true,
                    img: true,


                }

            })
            return res.json({ success: true, message: user })

        }


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



            if (!user) {
                return res.json({ success: false, message: "Not found" })

            }
            const data = user.Followers.some(p => p.follow == Number(val))

            res.json({ success: true, message: { user, data }, })

        } else {
            const user = await client.bloger.findFirst({
                where: {
                    id: Number(val)
                }, select: {
                    id: true,
                    name: true,
                    img: true,
                    blogs: {
                        select:{
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
                        }}},
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

            res.json({ success: true, message: { user } })
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "plz try later" })

    }
}