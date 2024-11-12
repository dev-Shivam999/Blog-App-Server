import { Request, Response } from "express";
import RedisApi from "../../utils/redis/redis";
import { client } from "../..";

export const UserSearch=async(req:Request,res:Response)=>{
    const {id}=req.params
    let cachedUsers = await RedisApi.get("User");
    if (cachedUsers) {
        cachedUsers = JSON.parse(cachedUsers);
        const user = Array.isArray(cachedUsers) && cachedUsers.filter(p => p.name.toLocaleLowerCase().includes(id.toLocaleLowerCase())) 
        return res.json({ success: true,data:user});
    }
    const data= await client.bloger.findMany({})
    await RedisApi.set("User",JSON.stringify(data))
    const d2=data.filter(p => p.name.toLocaleLowerCase().includes(id.toLocaleLowerCase())) 
    res.json({ success: true,data:d2})
}