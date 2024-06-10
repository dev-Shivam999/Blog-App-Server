import { Request, Response } from "express";
import { data } from "../../utils/types/types";
import { client } from "../..";

export const SignIn = async (req: Request<{}, {}, data>, res: Response) => {
    const body  = req.body;
    
    
    try {

        if (!req.file) {
            return res.json({ susses: false, message: "Please upload your img" });
        }
        
        
        

        const user = await client.bloger.findFirst({
            where: {
                email: body.email,
            }
        })

        if (user) {
            return res.json({ success: false, message: "user have account already" })


        }

        const userId = await client.bloger.create({
            data: {
                email: body.email,
                name: body.name,
                img: `/uploads/${req.file.filename}`,
                password: body.password

            }, select: {
                id: true,
            }
        })
        

        return res.json({ success: true, message: `${userId.id}` })
    } catch (error) {
        console.log("error", error);
        res.json({ success: false, message: "success failed" })

    }
}