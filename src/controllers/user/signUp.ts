import { Request, Response } from "express";
import { data } from "../../utils/types/types";
import { client } from "../..";

export const Sign = async (req: Request<{}, {}, data>, res: Response) => {
    const  body  = req.body;
    
    
   
    
    try {


        const user = await client.bloger.findFirst({
            where: {
                email: body.email,
            }
        })



        if (user) {

            if (user.password = body.password) {
                
                return res.json({ success:true , message: user.id})
            }else{
                return res.json({ success: false, message: "password not match"})

            }


        }
        
        return res.json({ success: false, message: 'user not found' })
    } catch (error) {
        console.log("error", error);
        res.json({ success: false, message: "success failed" })

    }
}