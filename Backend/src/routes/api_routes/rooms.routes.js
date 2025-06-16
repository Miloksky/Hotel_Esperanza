const express = require('express');
const router = express.Router();
const roomsC = require('../../controllers/rooms.controllers')

router.get('/show/rooms', roomsC.getAllRooms);
router.get('/show/rooms/:id', roomsC.getRoomById);
router.post('/create/rooms',roomsC.createRoom);
router.put('/update/rooms/:id', roomsC.updateRoom);
router.delete('/delete/rooms/:id', roomsC.deleteRoom);

module.exports = router;