const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");

async function userDetails(req, res) {
  try {
    const token = req.cookies.token || "";
    const user = await getUserDetailFromToken(token);
    return res
      .status(200)
      .json({ message: "user details", data: user, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
}

module.exports.handler = userDetails;
