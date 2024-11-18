import { mongoose } from 'mongoose';

export const connection =() =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_PORTAL_WITH_AUTOMATION"
    }).then(()=>{
        console.log("Buddy, Database connected successfully");
    }).catch((err)=>{
        console.log(`Buddy, There are some errors--> ${err}`);
    });
}