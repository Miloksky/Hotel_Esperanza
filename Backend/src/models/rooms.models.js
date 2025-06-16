// models/room.model.js

const db = require('../config/connection');

class Room {

    static async getAllRoomsFromDb() {
        const [rows] = await db.query('SELECT * FROM rooms');
        return rows;
    }

    static async getRoomByIdFromDb(id) {
        const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [id]);
        return rows[0];
    }

    static async createRoomInDb(number, type, description, price, available) {
        const isAvailable = (typeof available === 'boolean') ? available : (available === 'true' || available === undefined || available === null);

        const [result] = await db.query(
            'INSERT INTO rooms (number, type, description, price, available) VALUES (?, ?, ?, ?, ?)',
            [number, type, description, price, isAvailable]
        );
        return result.insertId;
    }

    static async updateRoomInDb(id, number, type, description, price, available) {
        const isAvailable = (typeof available === 'boolean') ? available : (available === 'true' || available === undefined || available === null);

        const [result] = await db.query(
            'UPDATE rooms SET number = ?, type = ?, description = ?, price = ?, available = ? WHERE id = ?',
            [number, type, description, price, isAvailable, id] 
        );
        return result.affectedRows;
    }

    static async deleteRoomFromDb(id) {
    try {

        await db.query('DELETE FROM reservation_rooms WHERE room_id = ?', [id]);
        const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
}

module.exports = Room;