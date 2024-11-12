import { Request, Response } from "express";
import { client } from "../..";  
import RedisApi from "../../utils/redis/redis";

export const All = async (req: Request, res: Response) => {
  const id = req.header("authorization");

  try {
    let cachedBlogs = await RedisApi.get("Blogs");
    if (cachedBlogs) {
      cachedBlogs = JSON.parse(cachedBlogs); 



      if (!id) {
        return res.json({ success: false, blogs: cachedBlogs });
      }

      let cachedUsers = await RedisApi.get("User");
      if (cachedUsers) {
        cachedUsers = JSON.parse(cachedUsers);  
        const user = Array.isArray(cachedUsers) ? cachedUsers.find((p) => p.id === Number(id)) : null;

        return res.json({ success: true, blogs: cachedBlogs, vali: user ? user.img : null });
      }
    }
    

    const blogs = await client.blog.findMany({
      select: {
        avtar: true,
        content: true,
        title: true,
        created: true,
        id: true,
        authore: {
          select: { name: true, img: true, id: true },
        },
        Likes: {
          select: { blogerId: true },
        },
      },
      orderBy: {
        Likes: {
          _count: "desc",
        },
      },
    });

    await RedisApi.set("Blogs", JSON.stringify(blogs));  

    if (!id) {
      return res.json({ success: false, blogs });
    }

    const users = await client.bloger.findMany({
      select: { id: true, name:true, img: true },
    });

    await RedisApi.set("User", JSON.stringify(users));  

    const user = users.find((u) => u.id === Number(id));

    return res.json({ success: true, blogs, vali: user ? user.img : null });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.json({ success: false });
  }
};
