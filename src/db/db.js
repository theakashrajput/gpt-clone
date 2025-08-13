import mongoose from "mongoose";

const connectTODB = () => {
    mongoose.connect(process.env.MONGOOSE_URI)
        .then(() => console.log("Connected to DB"))
        .catch(err => console.log("Failed to connect to DB", err))
}

export default connectTODB;