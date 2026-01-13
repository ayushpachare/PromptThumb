import {Request , Response , NextFunction} from 'express';

const protect = async (req:Request , res:Response , next:
    NextFunction)=>{
        const {isLoggedin , userId} = req.session;

        if(!isLoggedin || !userId){
            return res.status(401).json({message:'You are not logged in'})
        }  
        next()
}
export default protect