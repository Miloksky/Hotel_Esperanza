const express = require('express');
const router = express.Router();
const roomsC = require('../../controllers/rooms.controllers');
const { authorizeAdmin, authenticateToken } = require('../../middleware/auth.middleware');


router.get('/show/rooms', roomsC.getAllRooms);
router.get('/show/rooms/:id', roomsC.getRoomById);
router.post('/create/rooms', authenticateToken, authorizeAdmin, roomsC.createRoom);
router.put('/update/rooms/:id', authenticateToken, authorizeAdmin, roomsC.updateRoom);
router.delete('/delete/rooms/:id', roomsC.deleteRoom);
router.get('/getRoomsResources/rooms/:id/resources',roomsC.getRoomResources)
router.post('/addResourcesToRooms/rooms/:id/resources',authenticateToken,roomsC.assignResourcesToRoom);

module.exports = router;