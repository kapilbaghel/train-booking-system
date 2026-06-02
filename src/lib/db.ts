import mongoose from "mongoose";

export async function ConnectDB(){
    try{
        if(mongoose.connections[0].readyState === 1){
            console.log("mongodb connected")
            return;
        }
        await mongoose.connect(process.env.MONGO_URI!)
    }catch(err){
        console.log("db connection error",err)
    }
}