const cloudinary = require("../config/cloudinary");
const Message = require("../models/Message");
const saveMessage = async (data) => {
  try {
    const imagePromises =
      data.msg.image?.map(async (image) => {
        try {
          const res = await cloudinary.uploader.upload(image, {
            folder: "chat/images",
          });
          return res;
        } catch (uploadErr) {
          console.error(
            "Error uploading image to Cloudinary:",
            uploadErr.message
          );
          throw new Error("Image upload failed");
        }
      }) || [];

    const imageUrls = await Promise.all(imagePromises);
    const images = imageUrls.map((image) => ({
      id: image.asset_id,
      url: image.secure_url,
    }));

    const messageData = {
      msg: data.msg.message,
      image: images,
      sender: data.sender,
      receiver: data.receiver,
    };

    const saveMsg = new Message(messageData);

    await saveMsg.save();
    return saveMsg;
  } catch (err) {
    console.error("Error saving message:", err.message);
    throw new Error("Message saving failed");
  }
};

const isDownloaded = async (data) => {
  try {
    const isDownloaded = await Message.updateOne(
      { _id: data.id, "image.id": data.imageId }, // Match the document and specific image
      {
        $set: {
          "image.$.isDownloaded": true, // Use positional operator `$` to update the matched array element
        },
      }
    );
    const res = await Message.find();

    return res;
  } catch (err) {
    console.error("Error checking image download status:", err.message);
    throw new Error("Image download status check failed");
  }
};

module.exports.handler = saveMessage;

module.exports.handler.isDownloaded = isDownloaded;
