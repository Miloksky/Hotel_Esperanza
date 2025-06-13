const router = require("express").Router();

router.use("/user",require("./api_routes/user_routes"));

router.use("/reserva", require("./api_routes/reservas.routes"));

router.use("/habitaciones", require("./api_routes/habitaciones.routes"));

module.exports = router