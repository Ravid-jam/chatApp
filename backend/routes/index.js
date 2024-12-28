const express = require("express");
const { registerUser, login } = require("../controller/registerUser");
const logout = require("../controller/logout");
const { getMessage, deleteMsg } = require("../controller/message");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getMessage/:senderId/:receiverId", getMessage);
router.delete("/deleteMsg/:id", deleteMsg);

module.exports.handler = router;
