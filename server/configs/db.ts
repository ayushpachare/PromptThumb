import { log } from "console"
import mongoose from "mongoose"

const connectionDB = async ()=>{
    try{
        mongoose.connection.on('connected',()=>{
            console.log("MongoDB connected");
        })
        await mongoose.connect(process.env.MONGODB_URI as string)
    } catch (error){
        console.error("Error Connecting to mongoDB: ",error);
    }
}
export default connectionDB;