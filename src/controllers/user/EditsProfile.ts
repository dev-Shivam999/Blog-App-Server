import { Request, Response } from "express";
import { client } from "../..";
import RedisApi from "../../utils/redis/redis";


export const EditsProfile = async (req: Request, res: Response) => {
    const id = req.header("authorization");
    const user = req.body;

  

    try {
        
            if (id) {
             await client.bloger.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        name: user.name,
                        img: user.avtar
                    },
                });
              
                await RedisApi.del("User")
                return res.json({ success: true });
            }
        // } else {
        //     if (id) {
        //         const data = await client.bloger.findFirst({
        //             where: {
        //                 id: Number(id),
        //             },
        //             select: {
        //                 img: true,
        //             },
        //         });
               

        //         if (data && data.img) {
        //             const filePath = path.resolve(
        //                 `dist/uploads/${data.img.split("/uploads/")[1]}`
        //             );
                    

        //             if (fs.existsSync(filePath)) {
        //                 fs.unlinkSync(filePath);
        //             } else {
        //                 console.log("File not found");
        //             }

        //             await client.bloger.update({
        //                 where: {
        //                     id: Number(id),
        //                 },
        //                 data: {
        //                     name: user.name,
        //                     img: `/uploads/${req.file.filename}`,
        //                 },
        //             });
                    
        //             return res.json({ success: true });
        //         }
        //     }
        // }

        else{
            return res.json({ success: false,message :"login plz"})
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
};