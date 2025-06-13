const express = require('express');
const router = require("express").Router();

router.use("/user", require("./api_routes/user_routes"));

router.use("/reserva", require("./api_routes/reservations.routes"));

router.use("/resource", require("./api_routes/resource.routes"));

router.use("/habitaciones", require("./api_routes/rooms.routes"));



module.exports = router