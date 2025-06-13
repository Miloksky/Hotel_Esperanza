const express = require('express');
const { getAllReservations, createReservation } = require('../../controllers/reservations.controllers');
const router = express.Router();


router.get('/reservations', getAllReservations);
router.post('/create', createReservation)

module.exports = router;