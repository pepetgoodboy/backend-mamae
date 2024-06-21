import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serviceName: { type: String, required: true },
  qty: { type: Number, required: true },
  phone: { type: String, required: true },
  type: { type: String, required: true },
  method: { type: String, required: true },
  total: { type: Number, required: true },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
