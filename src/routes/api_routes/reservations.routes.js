const router = require("express").Router();
const revervationC = require("../../controllers/reservations.controllers");
const checkToken = require("../../middleware/auth");

router.post("/create",checkToken,revervationC.createRoomReservation);



module.exports = router;