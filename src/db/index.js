import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connected_DB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        console.log(`\n MongoDb connected!!!! DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection Failed",error);
        process.exit(1);
    }
}
export default connected_DB;