const db = require('../config/connection');

// Obtengo todas las reservas con sus habitaciones y recursos
const getAllReservations = async (req, res) => {
  try {
    const [reservations] = await db.query('SELECT * FROM reservations');

    for (const reservation of reservations) {
      const [rooms] = await db.query(
        'SELECT rr.*, r.number, r.type FROM reservation_rooms rr JOIN rooms r ON rr.room_id = r.id WHERE rr.reservation_id = ?',
        [reservation.id]
      );
      const [resources] = await db.query(
        'SELECT rsr.*, res.name FROM reservation_resources rsr JOIN resources res ON rsr.resource_id = res.id WHERE rsr.reservation_id = ?',
        [reservation.id]
      );
      reservation.rooms = rooms;
      reservation.resources = resources;
    }

    res.json(reservations);
  } catch (error) {
    res.json({ error: 'Error al obtener las reservas' });
  }
};

// Obtengo una reserva por ID con sus detalles
const getReservationById = async (req, res) => {
  try {
    const [reservationRows] = await db.query('SELECT * FROM reservations WHERE id = ?', [req.params.id]);
    if (reservationRows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    const reservation = reservationRows[0];

    const [rooms] = await db.query(
      'SELECT rr.*, r.number, r.type FROM reservation_rooms rr JOIN rooms r ON rr.room_id = r.id WHERE rr.reservation_id = ?',
      [reservation.id]
    );
    const [resources] = await db.query(
      'SELECT rsr.*, res.name FROM reservation_resources rsr JOIN resources res ON rsr.resource_id = res.id WHERE rsr.reservation_id = ?',
      [reservation.id]
    );

    reservation.rooms = rooms;
    reservation.resources = resources;

    res.json(reservation);
  } catch (error) {
    res.json({ error: 'Error al obtener la reserva' });
  }
};

// Crear una nueva reserva con habitaciones y recursos
const createReservation = async (req, res) => {
  const { user_id, created_at, rooms, resources } = req.body;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [reservationResult] = await conn.query(
      'INSERT INTO reservations (user_id, created_at) VALUES (?, ?)',
      [user_id, created_at]
    );
    const reservationId = reservationResult.insertId;

    for (const room of rooms) {
      await conn.query(
        'INSERT INTO reservation_rooms (reservation_id, room_id, unit_price, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
        [reservationId, room.room_id, room.unit_price, room.start_date, room.end_date]
      );
    }

    for (const resource of resources) {
      await conn.query(
        'INSERT INTO reservation_resources (reservation_id, resource_id, unit_price, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
        [reservationId, resource.resource_id, resource.unit_price, resource.start_time, resource.end_time]
      );
    }

    await conn.commit();
    res.status(201).json({ id: reservationId, message: 'Reserva creada' });
  } catch (error) {
    console.log(error)
    await conn.rollback();
    res.json({ error: 'Error al crear la reserva' });
  } finally {
    conn.release();
  }
};

// Eliminar una reserva y sus datos asociados
const deleteReservation = async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const reservationId = req.params.id;

    await conn.query('DELETE FROM reservation_resources WHERE reservation_id = ?', [reservationId]);
    await conn.query('DELETE FROM reservation_rooms WHERE reservation_id = ?', [reservationId]);
    const [result] = await conn.query('DELETE FROM reservations WHERE id = ?', [reservationId]);

    await conn.commit();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    await conn.rollback();
    res.json({ error: 'Error al eliminar la reserva' });
  } finally {
    conn.release();
  }
};

module.exports = { getAllReservations, getReservationById, createReservation, deleteReservation }