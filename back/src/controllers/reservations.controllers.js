const reservationsM = require("../models/reservations.models");
const {
  checkInBeforeToday,
  invalidDates,
  numberOfNights,
} = require("../utils/validators");

const createRoomReservation = async (req, res) => {
  try {
    const { rooms } = req.body;
    const user_id = req.userLogin.id;

    if (!Array.isArray(rooms) || rooms.length === 0) {
      return res.status(400).json({ msg: "No hay habitaciones seleccionadas" });
    }

    const reservation_id = await reservationsM.createReservationId(user_id);
    let totalReservation = 0;

    for (let room of rooms) {
      const roomInfo = await reservationsM.findIdAndPriceByNumber(room.number);
      if (!roomInfo) {
        await reservationsM.deleteReservation(reservation_id);
        return res.status(404).json({ msg: "La habitación no existe" });
      }
      const { id: room_id, price: room_price } = roomInfo;

     let resourcePrice = 0;
    if (room.resource_id !== null && room.resource_id !== undefined) {
    resourcePrice = await reservationsM.findResourcePriceById(room.resource_id);
    if (!resourcePrice) {
        await reservationsM.deleteReservation(reservation_id);
        return res.status(400).json({ msg: "El recurso no existe" });
    }
}

      if (invalidDates(room.start_date, room.end_date)) {
        await reservationsM.deleteReservation(reservation_id);
        return res.status(400).json({ msg: "Las fechas son inválidas" });
      }

      if (checkInBeforeToday(room.start_date)) {
        await reservationsM.deleteReservation(reservation_id);
        return res.status(400).json({
          msg: "Las fechas son incorrectas",
        });
      }

      const nights = numberOfNights(room.start_date, room.end_date);

      const subtotal = (Number(room_price) + Number(resourcePrice))* Number(nights);
      totalReservation += subtotal;
      console.log('room_price:', room_price, 'resourcePrice:', resourcePrice, 'nights:', nights);

      const overlap = await reservationsM.checkOverlap(
        room_id,
        room.start_date,
        room.end_date
      );

      if (overlap) {
        await reservationsM.deleteReservation(reservation_id);
        return res.status(400).json({
          msg: "las fechas no estan disponibles",
        });
      }

      const reservation = await reservationsM.addReservation(
        reservation_id,
        room_id,
        room.start_date,
        room.end_date,
        room_price,
        subtotal,
        room.resource_id

      );
      if (!reservation) {
        await reservationsM.deleteReservation(reservation_id);
        return res.status(400).json({
          msg: "no se ha podido crear la reserva",
        });
      }
    }

    const totalAddedInReservation = await reservationsM.setTotalReservation(
      reservation_id,
      totalReservation
    );
    if (!totalAddedInReservation) {
      return res.status(400).json({
        msg: "Error al añadir el precio",
      });
    }
    

    return res.status(200).json({
      success: true,
      msg: "la reserva ha sido creada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllreservations = async (req, res) => {
  if (req.userLogin.role !== "admin") {
    return res.status(403).json({
      msg: "no tienes acceso a esta configuración",
    });
  }
  const reservations = await reservationsM.getAll();
  if (!reservations) {
    return res.status(404).json({
      msg: "no se han encontrado reservas",
    });
  }
  return res.status(200).json({
    success: true,
    data: reservations,
  });
};

const getReservationByUser = async (req, res) => {
  try {
  
    if (!req.userLogin.role) {
      return res.status(403).json({
        msg: "no tienes acceso a esta configuración",
      });
    }

    const { id } = req.params;
    const reservations = await reservationsM.getReservationByUserId(id);
    if (!reservations) {
      return res.status(404).json({
        msg: "no se han encontrado reservas para este usuario",
      });
    }

    return res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    console.log(error);
  }
};

const editReservation = async (req, res) => {
  try {
    if (!req.userLogin.role) {
      return res.status(403).json({
        msg: "no tienes acceso a esta configuración",
      });
    }
    const { id } = req.params;
    const { number, start_date, end_date } = req.body;
    const roomInfo = await reservationsM.findIdAndPriceByNumber(number);
    if (!roomInfo) {
      return res.status(404).json({ msg: "La habitación no existe" });
    }
    const { id: room_id, price: room_price } = roomInfo;

    if (invalidDates(start_date, end_date)) {
      return res.status(400).json({ msg: "Las fechas son inválidas" });
    }

    if (checkInBeforeToday(start_date)) {
      return res.status(400).json({
        msg: "Las fechas son incorrectas",
      });
    }

    const nights = numberOfNights(start_date, end_date);

    const subtotal = room_price * nights;
    const overlap = await reservationsM.checkOverlapEdit(
      room_id,
      start_date,
      end_date,
      id
    );

    if (overlap) {
      return res.status(400).json({
        msg: "las fechas no estan disponibles",
      });
    }

    const reservationId = await reservationsM.findReservationId(id);
    if (!reservationId) {
      return res.status(404).json({
        succes: false,
        msg: "no se encuentra el id de reserva",
      });
    }

    const updatedReservation = await reservationsM.updateReservation(
      id,
      start_date,
      end_date,
      room_price,
      subtotal
    );
    if (!updatedReservation) {
      return res.status(400).json({
        msg: "No se ha podido actualizar la reserva",
      });
    }
    const newTotal = await reservationsM.recalculateTotal(reservationId);
    const totalAddedInReservation = await reservationsM.setTotalReservation(
      reservationId,
      newTotal
    );
    if (!totalAddedInReservation) {
      return res.status(400).json({
        msg: "Error al añadir el precio",
      });
    }

    return res.status(200).json({
      msg: "Reserva actualizada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }

};
  const deleteReservation = async(req,res)=>{
    if (!req.userLogin.role) {
      return res.status(403).json({
        msg: "no tienes acceso a esta configuración",
      });
    }
    const {id} = req.params;
    const deletedReservation = await reservationsM.deleteById(id);
    if(!deletedReservation){
      return res.status(404).json({
        msg:"No se ha podido eliminar la reserva"
      });
    }
    return res.status(200).json({
      msg:"Reserva eliminada"
    });
  }

  const checkAvailability = async (req, res) => {
  try {
    const { start_date, end_date, guests } = req.body;
    if (invalidDates(start_date, end_date)) {
      return res.status(400).json({ success: false, msg: "Las fechas son inválidas" });
    }
    if (checkInBeforeToday(start_date)) {
      return res.status(400).json({ success: false, msg: "La fecha de entrada no puede ser anterior a hoy" });
    }
   

    let roomsAvailable = await reservationsM.findAvailableRooms(start_date, end_date);
    console.log(roomsAvailable)
    if (!roomsAvailable) {
      //preguntar esta parte
      roomsAvailable = []
      return res.status(200).json(roomsAvailable);
    }
    let totalCapacity = 0;
    let selectedRooms = [];
    for (const room of roomsAvailable) {
      totalCapacity += room.capacity;
    }
    if (totalCapacity >= guests) {
      selectedRooms = roomsAvailable;
     } 
    return res.status(200).json(selectedRooms);
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error del servidor" });
  }
};


module.exports = {
  createRoomReservation,
  getAllreservations,
  getReservationByUser,
  editReservation,
  deleteReservation,
  checkAvailability
};
