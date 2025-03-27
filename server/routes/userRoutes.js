const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/active-skins", authMiddleware, UserController.getUsersActiveSkins);

module.exports = router;
