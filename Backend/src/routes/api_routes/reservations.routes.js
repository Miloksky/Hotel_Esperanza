const express = require('express');
const { getAllReservations, createReservation } = require('../../controllers/reservations.controllers');
const router = express.Router();


router.get('/', getAllReservations);
router.post('/', createReservation)

module.exports = router;