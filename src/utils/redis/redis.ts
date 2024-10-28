
import { createClient } from "redis"

const RedisApi=createClient({
    url: process.env.REDIS_URL
})
RedisApi.connect().then(()=>{
    console.log("redis connect");
    
}).catch((error)=>{
    console.log("error: " + error);
    
})

RedisApi.on("error", (error)=>{console.log("error: " + error);
})
export default RedisApi