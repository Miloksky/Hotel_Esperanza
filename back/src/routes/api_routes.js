const router = require("express").Router();

router.use("/user",require("./api_routes/user_routes"));

module.exports = router