const express = require('express');
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../../controllers/rooms.controllers');
const router = express.Router();

router.get('/show', getAllRooms);
router.get('/show/:id', getRoomById);
router.post('/create', createRoom);
router.put('/update/:id', updateRoom);
router.delete('/delete/:id', deleteRoom);

module.exports = router;