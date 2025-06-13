const db = require('../config/connection');

// Obtengo todas las reservas:
const getAllReservations = async(req, res) => {
  try{
    const [rows] = await db.query('SELECT * FROM reservas');
    res.json(rows);
  } catch(error) {
    res.status(500).json({ error: 'Error al obtener las reservas' })
  }
};

// Creo una nueva reserva:
const createReservation = async(req, res) => {
  const { nombre, fecha_entrada, fecha_salida, habitacion_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO reservas (nombre, fecha_entrada, fecha_salida, habitacion_id) VALUES (?, ?, ?, ?)',
      [ nombre, fecha_entrada, fecha_salida, habitacion_id ]
    );
    res.status(201).json({
      id: result.insertId,
      message: 'Reserva creada con exito'
    });
  } catch(error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};


module.exports = {
    getAllReservations,
    createReservation
}