import mongoose from "mongoose";

export const connectDB=async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection Successfull ! \nConnection Host ${conn.connection.host}`)
    } catch (error) {
        console.error(`Connection Failed : ${error.message}`);
    }
    
}