import orderModel from "../models/orderModel.js";

// Add Orders
const addOrders = async (req, res) => {
  const order = new orderModel({
    name: req.body.name,
    serviceName: req.body.serviceName,
    qty: req.body.qty,
    phone: req.body.phone,
    type: req.body.type,
    method: req.body.method,
    total: req.body.total,
  });
  try {
    await order.save();
    res.json({
      success: true,
      message: "Order Success, Please Check your Whatsapp",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const order = await orderModel.find({});
    res.json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove Orders
const removeOrders = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    await orderModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addOrders, getOrders, removeOrders };
