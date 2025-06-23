const express = require('express');
const router = express.Router();
const roomsC = require('../../controllers/rooms.controllers');
const {checkToken} = require("../../middleware/auth");


router.get('/show/rooms', roomsC.getAllRooms);
router.get('/show/rooms/:id', roomsC.getRoomById);
router.post('/create/rooms', checkToken('admin'), roomsC.createRoom);
router.put('/update/rooms/:id', checkToken('admin'), roomsC.updateRoom);
router.delete('/delete/rooms/:id', roomsC.deleteRoom);

module.exports = router;