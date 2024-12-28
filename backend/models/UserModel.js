const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provided Name"],
    },
    email: {
      type: String,
      required: [true, "Provided Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Provided Password"],
    },
    profile_pic: {
      id: {
        type: String,
        required: [true, "Profile picture ID is required"],
      },
      url: {
        type: String,
        required: [true, "Profile picture URL is required"],
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
