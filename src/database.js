import mongoose from "mongoose";

mongoose.set('strictQuery', true)

const connection = async() => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGODB_URI_PRODUCTION)
        console.log(`DBB ok on ${connection.host} - ${connection.port}`);

    }catch(error){
        console.log(error);
    }
}

export default connection