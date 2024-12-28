const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetail(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailFromToken(token);

    const { name, profile_pic } = req.body;
    const updateUser = await UserModel.updateOne(
      { id: user.id },
      {
        name,
        profile_pic,
      }
    );

    const userInformation = await UserModel.findById({ _id: user.id });
    res.json({
      message: "user update successfully",
      data: userInformation,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true });
  }
}

module.exports.handler = updateUserDetail;
