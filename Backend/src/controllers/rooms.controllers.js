const Room = require('../models/rooms.models');

// Obtener todas las habitaciones:
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.getAllRoomsFromDb();
        res.json(rooms);
    } catch (error) {
        console.error('Error al obtener todas las habitaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener las habitaciones' });
    }
};

// Obtener una habitación por ID:
const getRoomById = async (req, res) => {
    try {
        const room = await Room.getRoomByIdFromDb(req.params.id);
        if (!room) {
            return res.status(404).json({ error: 'Habitación no encontrada' });
        }
        res.json(room);
    } catch (error) {
        console.error('Error al obtener la habitación por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener la habitación' });
    }
};

// Crear una habitación:
const createRoom = async (req, res) => {
    const { number, type, description, price, available  } = req.body;
    try {
        const newRoomId = await Room.createRoomInDb(number, type, description, price, available );
        res.status(201).json({
            id: newRoomId,
            message: 'Habitación creada exitosamente'
        });
    } catch (error) {
        console.error('Error al crear la habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear la habitación' });
    }
};

// Actualizar una habitación:
const updateRoom = async (req, res) => {
    const { number, type, description, price, available  } = req.body;
    try {
        const affectedRows = await Room.updateRoomInDb(req.params.id, number, type, description, price, available );
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Habitación no encontrada para actualizar' });
        }
        res.json({ message: 'Habitación actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar la habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar la habitación' });
    }
};

// Eliminar una habitación:
const deleteRoom = async (req, res) => {
    try {
        const affectedRows = await Room.deleteRoomFromDb(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Habitación no encontrada para eliminar' });
        }
        res.json({ message: 'Habitación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor al eliminar la habitación' });
    }
};

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom };