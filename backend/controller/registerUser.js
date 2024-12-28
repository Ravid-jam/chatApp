const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "Already user exists", err: true });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const uploadResult = await cloudinary.uploader.upload(profile_pic, {
      folder: "user_profile_pictures",
    });
    const payload = {
      name,
      email,
      password: hashedPassword,

      profile_pic: {
        id: uploadResult.asset_id,
        url: uploadResult.secure_url,
      },
    };
    const user = await UserModel(payload);
    const userSave = await user.save();
    return res.status(200).json({
      message: "User registered successfully",
      user: userSave,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", err: true });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", err: true });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful",
      token: token,
      data: user,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true });
  }
}

module.exports.handler = { registerUser, login };
