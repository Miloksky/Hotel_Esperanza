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
  const { name, price, status } = req.body;

  const sql = 'INSERT INTO resources (name, price, status) VALUES (?, ?, ?)';
  const values = [name, price, status];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err); 
      res.status(500).json({ message: 'Error al insertar el recurso' });
    } else {
      res.status(201).json({ message: 'Recurso creado', id: result.insertId });
    }
  });
};



// Eliminar un recursio
exports.deleteResource = (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM resources WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar recurso:', err);
      return res.status(500).json({ error: 'Error al eliminar recurso' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    res.json({ message: 'Recurso eliminado correctamente' });
  });
};

// actualzairlo
exports.updateResource = (req, res) => {
  const id = req.params.id;
  const { name, price, status } = req.body;

  const sql = 'UPDATE resources SET name = ?, price = ?, status = ? WHERE id = ?';
  const values = [name, price, status, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error al actualizar el recurso' });
    } else {
      res.json({ message: 'Recurso actualizado' });
    }
  });
};
