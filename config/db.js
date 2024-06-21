import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_CONNECT_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};
