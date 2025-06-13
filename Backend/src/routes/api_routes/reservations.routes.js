const express = require('express');
const { getAllReservations, getReservationById, deleteReservation, createReservation } = require('../../controllers/reservations.controllers');
const router = express.Router();


router.get('/show/reservation', getAllReservations);
router.get('/show/reservation/:id', getReservationById);
router.post('/create/reservation', createReservation);
router.delete('/delete/reservation/:id', deleteReservation);

module.exports = router;