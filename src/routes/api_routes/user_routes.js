const router = require("express").Router();
const userC = require("../../controllers/user.controllers");
const checkToken = require("../../middleware/auth");


router.post("/register",userC.registerUser);
router.post("/login",userC.login);
router.get("/profile",checkToken,userC.getProfile);
router.put("/update/:id",checkToken,userC.editUser);

module.exports = router;
