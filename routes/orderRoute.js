import express from "express";
import {
  addOrders,
  getOrders,
  removeOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/add", addOrders);
orderRouter.get("/list", getOrders);
orderRouter.delete("/remove/:id", removeOrders);

export default orderRouter;
