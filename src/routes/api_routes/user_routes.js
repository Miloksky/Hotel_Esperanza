const router = require("express").Router();
const userC = require("../../controllers/user.controllers");

router.post("/register",userC.registerUser);
router.post("/login",userC.login)

module.exports = router;
