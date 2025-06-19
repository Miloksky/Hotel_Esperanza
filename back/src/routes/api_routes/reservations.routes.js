const router = require("express").Router();
const reservationC = require("../../controllers/reservations.controllers");
const checkToken = require("../../middleware/auth");

router.post("/create",checkToken,reservationC.createRoomReservation);
router.get("/list",checkToken,reservationC.getAllreservations);
router.get("/list/:id",checkToken,reservationC.getReservationByUser);
router.put("/edit/:id",checkToken,reservationC.editReservation);



module.exports = router;