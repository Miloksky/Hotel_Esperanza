const express = require('express');
const router = require("express").Router();

router.use("/user", require("./api_routes/user_routes"));

router.use("/resource", require("./api_routes/resource.routes"));

router.use("/rooms", require("./api_routes/rooms.routes"));

router.use("/reservations",require("./api_routes/reservations.routes"));



module.exports = router