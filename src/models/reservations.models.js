const pool = require("../config/connection");

const createReservationId = async (id) => {
    const insert = "INSERT INTO reservations (user_id) VALUES(?)";
    const [result] = await pool.query(insert,[id]);
    if(result.affectedRows === 0 ){
        return false;
    }

    return result.insertId;
}

const findIdByNumber = async (number) => {
    const find = "SELECT id FROM rooms WHERE number = ?";
    const [result] = await pool.query(find,[number]);
    if(result.length === 0){
        return false;
    }
    return result[0].id;

}

const addReservation = async(reservation_id,room_id,start_date,end_date)=>{
    const insert ="INSERT INTO reservation_rooms (reservation_id,room_id,start_date,end_date) VALUES(?,?,?,?)";
    const reservation =await pool.query(insert,[reservation_id,room_id,start_date,end_date]);
    if(reservation.affectedRows === 0){
        return false;
    }
    return reservation;
}

const deleteReservation = async(reservationId)=>{
    const deleteById ="DELETE FROM reservations WHERE id = ?";
    const [result] = await pool.query(deleteById,[reservationId]); 
}

const checkOverlap = async (room_id,newStartDate,newEndDate) => {
    const select = "SELECT * FROM reservation_rooms WHERE room_id = ? AND NOT ( ? <= start_date OR ? >= end_date )";
    const [result] = await pool.query(select,[room_id,newEndDate,newStartDate]);
    if(!result.length){
        return false
    }
    return result
}

module.exports = {createReservationId, findIdByNumber, addReservation, deleteReservation, checkOverlap}