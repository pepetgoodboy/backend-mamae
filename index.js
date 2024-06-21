import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import serviceRouter from "./routes/serviceRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

// App Config
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Api Endpoints
app.use("/api/services", serviceRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server is running on port " + port));
