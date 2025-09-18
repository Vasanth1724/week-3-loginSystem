import {connect } from 'mongoose'

export const connectToDb = async() =>{
    try{
        if(!process.env.MONGO_URI){
            throw new Error("db enviroment no set");
        }
        await connect(process.env.MONGO_URI);
        console.log("db connected successfully");
    }
    catch (error){
         console.error("error :" + error);
         throw new Error("not connected error");
    }
};