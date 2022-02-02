import mongoose from "mongoose";

const connectMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
    } catch (error) {
        console.log("mongoDB connection error!", (error as Error).message);
    }

    const connection = mongoose.connection;
    if (connection.readyState >= 1) {
        console.log("zaplanuj-jedzonko DB fired successfully!");
        return;
    }

    connection.on("error", () => console.log("Connection failed"));
};

export default connectMongoDB;