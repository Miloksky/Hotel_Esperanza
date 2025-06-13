const express = require('express');
const router = require("express").Router();

router.use("/user", require("./api_routes/user_routes"));

router.use("/reservation", require("./api_routes/reservations.routes"));

router.use("/resource", require("./api_routes/resource.routes"));

router.use("/rooms", require("./api_routes/rooms.routes"));



module.exports = router