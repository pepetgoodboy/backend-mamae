import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.json({ success: false, message: "You are not Admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register Admin
const registerAdmin = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Check if user already exists
    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Admin already exists" });
    }

    // Validate email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email!",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password!",
      });
    }

    // Hash Admin Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new adminModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const admin = await newAdmin.save();
    const token = createToken(admin._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginAdmin, registerAdmin };
