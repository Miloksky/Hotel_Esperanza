const db = require('../config/connection.js');

// Obtener todos los recursos
exports.getAllResources = (req, res) => {
  const sql = 'SELECT * FROM resources';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener recursos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    res.json(results);
  });
};
// create
exports.createResource = (req, res) => {
  const { name, price } = req.body;

  const sql = 'INSERT INTO resources (name, price) VALUES (?, ?)';
  const values = [name, price];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err); 
      res.status(500).json({ message: 'Error al insertar el recurso' });
    } else {
      res.status(201).json({ message: 'Recurso creado', id: result.insertId });
    }
  });
};

// // Crear un recurso
// exports.createResource = async (req, res) => {
//   try {
//     const { name, price, status } = req.body;

//     const sql = 'INSERT INTO resources (name, price, status) VALUES (?, ?, ?)';
//     const [result] = await db.query(sql, [name, price, status]);

//     res.status(201).json({ message: 'Recurso creado', id: result.insertId });
//   } catch (err) {
//     console.error('Error al crear recurso:', err);
//     res.status(500).json({ message: 'Error al insertar el recurso' });
//   }
// };

// Eliminar un recurso
exports.deleteResource = async (req, res) => {
  try {
    const id = req.params.id;

    const sql = 'DELETE FROM resources WHERE id = ?';
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    res.json({ message: 'Recurso eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar recurso:', err);
    res.status(500).json({ error: 'Error al eliminar recurso' });
  }
};

// Actualizar un recurso
exports.updateResource = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, status } = req.body;

  const sql = 'UPDATE resources SET name = ?, price = ? WHERE id = ?';
  const values = [name, price, status, id];

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    res.json({ message: 'Recurso actualizado' });
  } catch (err) {
    console.error('Error al actualizar recurso:', err);
    res.status(500).json({ message: 'Error al actualizar el recurso' });
  }
};
// soools un recuros
exports.getResourceById = async (req, res) => {
  try {
    const id = req.params.id;

    const sql = 'SELECT * FROM resources WHERE id = ?';
    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener recurso:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
