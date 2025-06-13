const router = require("express").Router();
const userC = require("../../controllers/user.controllers");

router.post("/register",userC.registerUser)

module.exports = router;
