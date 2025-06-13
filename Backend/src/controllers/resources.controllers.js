const db = require('../config/connection');

// Obtener todos los recursos:
const getAllResources = async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM resources')
        res.json(rows);
    }catch(error) {
        res.json({ error: 'Error al obtener los recursos' })
    }
};

// Obtener el recurso por la ID:
const getResourcesById = async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [req.params.id]);
        if(rows.length === 0) {
            return res.json({ error: 'Recurso no encontrado' })
        }
        res.json(rows[0]);
    } catch(error) {
        res.json({ error: 'Error al obtener el recurso' })
    }
};

// Crear un nuevo recurso:
const createResource = async(req,res) => {
    const { name, price } = req.body;
    try{
        const [result] = await db.query(
            'INSERT INTO resources ( name, price ) VALUES (?, ?)',
            [ name, price]
        )
        res.json({
            id: result.insertId,
            message: 'Recurso creado'
        });
    } catch(error){
      console.log(error)
        res.json({ error: 'Error al crear recurso' })
    }
};

//Actualizar recurso:
const updateResource = async (req, res) => {
  const { name, price } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE resources SET name = ?, price = ? WHERE id = ?',
      [name, price, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.json({ error: 'Recurso no encontrado' });
    }
    res.json({ message: 'Recurso actualizado' });
  } catch (error) {
    console.log(error)
    res.json({ error: 'Error al actualizar el recurso' });
  }
};

// Eliminar recurso
const deleteResource = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM resources WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.json({ error: 'Recurso no encontrado' });
    }
    res.json({ message: 'Recurso eliminado' });
  } catch (error) {
    res.json({ error: 'Error al eliminar el recurso' });
  }
};

module.exports = { getAllResources, getResourcesById, createResource, updateResource, deleteResource }