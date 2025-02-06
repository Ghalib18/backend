import dotenv from "dotenv"
import connected_DB from "./db/index.js";
import {app} from './app.js'
dotenv.config({ path:'./env'})
const Port =8000;
connected_DB()
.then(()=>{
    app.listen(Port,()=>{
        console.log(`server is running at port:${Port}`);
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed----",err);
})