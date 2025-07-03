const express = require('express');
const router = express.Router();
const roomsC = require('../../controllers/rooms.controllers');
const { authorizeAdmin, checkToken } = require('../../middleware/auth');



router.get('/show/rooms', roomsC.getAllRooms);
router.get('/show/rooms/:id', roomsC.getRoomById);
router.post('/create/rooms', checkToken, authorizeAdmin, roomsC.createRoom);
router.put('/update/rooms/:id', checkToken, authorizeAdmin, roomsC.updateRoom);
router.delete('/delete/rooms/:id', roomsC.deleteRoom);
router.get('/getRoomsResources/rooms/:id/resources',roomsC.getRoomResources)
router.post('/addResourcesToRooms/rooms/:id/resources',checkToken,roomsC.assignResourcesToRoom);

module.exports = router;