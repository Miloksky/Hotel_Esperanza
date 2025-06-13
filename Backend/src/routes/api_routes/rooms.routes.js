const express = require('express');
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../../controllers/rooms.controllers');
const router = express.Router();

router.get('/show/rooms', getAllRooms);
router.get('/show/rooms/:id', getRoomById);
router.post('/create/rooms', createRoom);
router.put('/update/rooms/:id', updateRoom);
router.delete('/delete/rooms/:id', deleteRoom);

module.exports = router;