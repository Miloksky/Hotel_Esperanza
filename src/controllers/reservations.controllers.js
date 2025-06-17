const reservationsM = require("../models/reservations.models");

const createRoomReservation= async (req,res) => {

    try {
        const {rooms} = req.body
        const user_id = req.userLogin.id;

        if (!Array.isArray(rooms) || rooms.length === 0){
            return res.status(400).json({ msg: "No hay habitaciones seleccionadas" });
        }

        const reservation_id = await reservationsM.createReservationId(user_id);

        for(let room of rooms){
            const room_id = await reservationsM.findIdByNumber(room.number);
            if (!room_id) {
                await reservationsM.deleteReservation(reservation_id);
                return res.status(404).json({ msg: "La habitación no existe" });
            }

            if (new Date(room.start_date) >= new Date(room.end_date)) {
                await reservationsM.deleteReservation(reservation_id);
                return res.status(400).json({ msg: "Las fechas son inválidas" });
            }
            
            const overlap = await reservationsM.checkOverlap(room_id,room.start_date,room.end_date);
            console.log(overlap);
            if(overlap){
                await reservationsM.deleteReservation(reservation_id)
                return res.status(400).json({
                    msg:"las fechas no estan disponibles"
                });
            }

            const reservation = await reservationsM.addReservation(reservation_id,room_id,room.start_date,room.end_date);
            
            if(!reservation){
                await reservationsM.deleteReservation(reservation_id);
                return res.status(400).json({
                    msg:"no se ha podido crear la reserva"
                });
            }
        }

         res.status(200).json({
                success: true,
                msg: "la reserva ha sido creada"
            });
        
    } catch (error) {
        console.log(error)
       res.status(500).json(error);
    }
    
}


module.exports = {createRoomReservation}