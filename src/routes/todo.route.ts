import Utils from "@/utils";
import { Router } from "express";

const todoRoute = Router()

todoRoute.use(async (req,  res, next)=>{
    const user_id = req.headers.user_id
    if(!user_id){
        Utils.throw("Not Authorized",401)
    }
    return next()
})



export default todoRoute