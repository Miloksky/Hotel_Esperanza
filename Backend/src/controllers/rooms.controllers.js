const db = require('../config/connection');

// Obtengo las habitaciones:
const getAllRooms = async(req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM rooms');
        res.json(rows);
    } catch(error) {
        res.json({ error: 'Error al obtener las habitaciones' });
    }
};

// Obtener una habitacion por ID:
const getRoomById = async(req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.json({ error: 'Habitación no encontrada' })
        }
        res.json(rows[0]);
    } catch(error) {
        res.json({ error: 'Error al obtener la habitación' })
    }
};

// Crear una habitacion:
const createRoom = async(req, res) => {
    const { number, type, description, price, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO rooms (number, type, description, price, status) VALUES (?, ?, ?, ?, ?)',
            [number, type, description, price, status || 'available']
        );
        res.json({
            id: result.insertId,
            message: 'Habitación creada'
        });
    } catch(error) {
        console.log(error)
        res.json({ error: 'Error al crear la habitación' });
    }
};

// Actualizar una habitacion:
const updateRoom = async(req, res) => {
    const { number, type, description, price, status } = req.body;
    try{
        const [result] = await db.query(
            'UPDATE rooms SET number = ?, type = ?, description = ?, price = ?, status = ? WHERE id = ?',
            [number, type, description, price, status, req.params.id]
        );
        if(result.affectedRows === 0) {
            return res.json({error: 'Habitación no encontrada'});
        }
        res.json({message: 'Habitación actualizada'});
    } catch(error) {
        res.json ({error: 'Error al actualizar la habitación'});
    }
};

// ELiminar una habitacion: 
const deleteRoom = async(req, res) => {
    try{
        const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [req.params.id])
        if(result.affectedRows === 0) {
            return res.json({error: 'Habitación no encontrada'})
        };
        res.json({message: 'Habitación eliminada'})
    } catch(error) {
        res.json({error: 'Error al eliminar la habitación'})
    }
};

module.exports = { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom };