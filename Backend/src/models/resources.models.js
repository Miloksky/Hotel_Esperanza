const db = require('../config/connection');

class Resource {

    static async getAllResourcesFromDb() {
        const [rows] = await db.query('SELECT * FROM resources');
        return rows;
    }

    static async getResourceByIdFromDb(id) {
        const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
        return rows[0];
    }

    static async createResourceInDb(name, price) {
        const [result] = await db.query(
            'INSERT INTO resources (name, price) VALUES (?, ?)',
            [name, price]
        );
        return result.insertId;
    }

    static async updateResourceInDb(id, name, price) {
        const [result] = await db.query(
            'UPDATE resources SET name = ?, price = ? WHERE id = ?',
            [name, price, id]
        );
        return result.affectedRows;
    }

    static async deleteResourceFromDb(id) {
        const [result] = await db.query('DELETE FROM resources WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = Resource;