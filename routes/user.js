const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);

module.exports = router;
