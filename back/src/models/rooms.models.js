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
    console.log('*** createRoomInDb: Preparando inserción con valores:', { number, type, description, price, isAvailable });
    try {
        const [result] = await db.query(
            'INSERT INTO rooms (number, type, description, price, available) VALUES (?, ?, ?, ?, ?)',
            [number, type, description, price, isAvailable]
        );
        console.log('*** createRoomInDb: Resultado de la consulta:', result);
        return result.insertId;
    } catch (error) {
        console.error('*** createRoomInDb: Error al ejecutar la consulta SQL:', error);
        throw error;
    }
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
static async getRoomResourcesFromDb(roomId) {
    const [rows] = await db.query(
        `SELECT res.id, res.name, res.price
         FROM resources res
         JOIN room_resources rr ON res.id = rr.resource_id
         WHERE rr.room_id = ?`,
        [roomId]
    );
    return rows;
}

static async assignResourcesToRoomInDb(roomId, resourceIds) {
    const values = resourceIds.map(resourceId => [roomId, resourceId]);
    const [result] = await db.query(
        `INSERT INTO room_resources (room_id, resource_id) VALUES ?`,
        [values]
    );
    return result.affectedRows;
}



}

module.exports = Room;