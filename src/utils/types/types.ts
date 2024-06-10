export interface data {
  
        email: string,
        img: string,
        name: string,
        password: string
   
}
export interface Post {
  
        Title: string,
        avtar:string
        content: string,
        authorId: string,
    
}
export interface Post2 {
    Post: {
        Title: string,
        content: string,
        authorId: string,
        blodId: string
    }
}