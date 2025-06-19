const router = require("express").Router();

router.use("/user",require("./api_routes/user_routes"));
router.use("/reservation",require("./api_routes/reservations.routes"));


module.exports = router