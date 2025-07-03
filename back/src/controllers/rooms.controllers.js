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
    const { number, type, description, price, available } = req.body;
  try {
        if (!req.userLogin || req.userLogin.role !== 'admin') {
                return res.status(403).json({ msg: 'No tienes permisos para esta acción' });
            }
        if (!number || !type || price === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

    const newRoomId = await Room.createRoomInDb({
      number,
      type,
      description,
      price,
      available
    });

    return res.status(201).json({
      id: newRoomId,
      message: 'Habitación creada exitosamente'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Número de habitación ya existente' });
    }
    console.error('Error en createRoom:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar una habitación:
const updateRoom = async (req, res) => {
    const { number, type, description, price, available  } = req.body;


    try {
        if (!req.userLogin || req.userLogin.role !== 'admin') {
            return res.status(403).json({ msg: 'No tienes permisos para esta acción' });
        }
     console.log('*** Rol de administrador verificado. Procediendo con la actualización.');

        const affectedRows = await Room.updateRoomInDb(req.params.id, number, type, description, price, available );

        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Habitación no encontrada para actualizar' });
        }
        res.json({ message: 'Habitación actualizada exitosamente' });
    } catch (error) {
        console.error('*** Error en updateRoom controller:', error);
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

// Obtener los recursos de una habitación:
const getRoomResources = async (req, res) => {
    try {
        const resources = await Room.getRoomResourcesFromDb(req.params.id);
        if (resources.length > 0) {
            res.json({
                success: true,
                message: 'Recursos obtenidos correctamente',
                data: resources
            });
        } else {
            res.json({
                success: false,
                message: 'Esta habitación no tiene recursos asignados'
            });
        }
    } catch (error) {
        console.error('Error al obtener los recursos de la habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los recursos' });
    }
};

// Asignar recursos a una habitación:
const assignResourcesToRoom = async (req, res) => {
    const { resourceIds } = req.body;
    const roomId = req.params.id;

    try {
        const affectedRows = await Room.assignResourcesToRoomInDb(roomId, resourceIds);

        if (affectedRows > 0) {
            res.json({
                success: true,
                message: 'Recursos asignados correctamente a la habitación'
            });
        } else {
            res.json({
                success: false,
                message: 'No se asignaron recursos'
            });
        }
    } catch (error) {
        console.error('Error al asignar recursos a la habitación:', error);
        res.status(500).json({ error: 'Error interno del servidor al asignar recursos' });
    }
};

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom, getRoomResources, assignResourcesToRoom };