const express = require("express");
const { login, logout, register, authorize } = require("./controllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/authorize", authorize);

module.exports = router;
