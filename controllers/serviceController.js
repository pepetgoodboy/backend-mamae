import serviceModel from "../models/serviceModel.js";
import fs from "fs";

// Add Service
const addService = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const service = new serviceModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: image_filename,
  });
  try {
    await service.save();
    res.json({ success: true, message: "Service Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Get All Services
const getServices = async (req, res) => {
  try {
    const services = await serviceModel.find({});
    res.json({ success: true, data: services });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove Services
const removeService = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    fs.unlink(`uploads/${service.image}`, () => {});

    await serviceModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Service Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addService, getServices, removeService };
