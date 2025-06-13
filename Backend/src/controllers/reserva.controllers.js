const crearReserva = (req, res) => {
  const { user_id, habitacion_id, fecha_inicio, fecha_fin } = req.body;

  const query = 'INSERT INTO reservas (user_id, habitacion_id, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)';

  db.query(query, [user_id, habitacion_id, fecha_inicio, fecha_fin], (err) => {
    if (err) return res.status(500).json({ error: 'Error al crear la reserva' });
    res.status(201).json({ message: 'Reserva creada correctamente' });
  });
};

module.exports = {
    crearReserva
}