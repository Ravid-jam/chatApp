const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: { type: String, default: "" },
    image: [
      {
        id: { type: String, default: "" },
        url: { type: String, default: "" },
        isDownloaded: { type: Boolean, default: false },
      },
    ],
    video: {
      id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    audio: {
      id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    sender: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    receiver: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
