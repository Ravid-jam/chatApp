const Message = require("../models/Message");

const getMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    if (!senderId && !receiverId) {
      response.status(404).json({ message: " id required", error: true });
    }
    const allMsg = await Message.find({
      $or: [
        { "sender._id": senderId, "receiver._id": receiverId },
        { "sender._id": receiverId, "receiver._id": senderId },
      ],
    });

    return res.json({ message: "All messages", data: allMsg, success: true });
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true });
  }
};

const deleteMsg = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      response.status(404).json({ message: "user id required", error: true });
    }
    const deleteMsg = await Message.findByIdAndDelete({ _id: id });
    if (!deleteMsg) {
      response.status(404).json({ message: "Message not found", error: true });
    }
    return res.json({
      message: "Message deleted successfully",
      data: deleteMsg,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || err, error: true });
  }
};

module.exports.handler = {
  getMessage,
  deleteMsg,
};
