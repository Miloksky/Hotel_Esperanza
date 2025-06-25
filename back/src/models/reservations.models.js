const pool = require("../config/connection");

const createReservationId = async (id) => {
    const insert = "INSERT INTO reservations (user_id) VALUES(?)";
    const [result] = await pool.query(insert,[id]);
    if(result.affectedRows === 0 ){
        return false;
    }

    return result.insertId;
    console.log(result)
}

const findIdAndPriceByNumber = async (number) => {
    const find = "SELECT id, price FROM rooms WHERE number = ?";
    const [result] = await pool.query(find,[number]);
    if(result.length === 0){
        return false;
    }
     return { id: result[0].id, price: result[0].price }
}
const addReservation = async(reservation_id,room_id,start_date,end_date,unit_price,subtotal)=>{
    const insert ="INSERT INTO reservation_rooms (reservation_id,room_id,start_date,end_date,unit_price,subtotalresource_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await pool.query(insert, [
        reservation_id,
        room_id,
        start_date,
        end_date,
        unit_price,
        subtotal,
        resource_id
    ]);
    if (result.affectedRows === 0) {
        return false;
    }
    return result;
};


const setTotalReservation = async (reservation_id, total) => {
    const update = "UPDATE reservations SET total = ? WHERE id = ?";
    const [result] = await pool.query(update, [total, reservation_id]);
    if(result.affectedRows === 0){
        return false;
    }
    return result.affectedRows
};

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

const checkOverlapEdit = async (room_id, start_date, end_date, currentId) => {
    const select = "SELECT * FROM reservation_rooms WHERE room_id = ? AND NOT ( ? <= start_date OR ? >= end_date ) AND id <> ?";
    const [result] = await pool.query(select, [room_id, end_date, start_date, currentId]);
    if(result.length === 0){
        return false;
    }
    return result;
};

const getAll = async () => {
    const select = "SELECT reservation_rooms.*,rooms.number AS room_number,users.name AS user_name FROM reservation_rooms JOIN rooms ON reservation_rooms.room_id = rooms.id JOIN reservations ON reservation_rooms.reservation_id = reservations.id JOIN users ON reservations.user_id = users.id ORDER BY reservation_rooms.start_date ASC";
    const [result] = await pool.query(select);
    if(result.length === 0){
        return false
    }
    return result
}

const getReservationByUserId = async (id) => {
    const select ="SELECT reservation_rooms.*, rooms.number AS room_number FROM reservation_rooms JOIN rooms ON reservation_rooms.room_id = rooms.id  JOIN reservations ON reservation_rooms.reservation_id = reservations.id WHERE reservations.user_id = ? ORDER BY reservation_rooms.start_date ASC"
    const [result] = await pool.query(select,[id]);
    if(result.length === 0){
        return false
    }
    return result;
}

const findReservationId = async(id)=>{
    const select = "SELECT * FROM reservation_rooms WHERE id = ?";
    const [result] = await pool.query(select,[id]);
    if(result.length === 0){
        return false;
    }
    return result[0].reservation_id
}

const updateReservation = async (id,start_date,end_date,unit_price,subtotal) => {
    const update = "UPDATE reservation_rooms SET start_date = ?, end_date = ?, unit_price = ?, subtotal = ? WHERE reservation_rooms.id = ?";
    const [result] = await pool.query(update,[start_date,end_date,unit_price,subtotal,id]);
    if(result.affectedRows === 0){
        return false;
    }
    return result;
}

const recalculateTotal = async (id)=>{
    const select = "SELECT SUM(subtotal) AS total FROM reservation_rooms WHERE reservation_id = ?";
    const [result] = await pool.query(select,[id]);
    console.log(result)
    return result[0].total;
}

const deleteById = async (id) => {
    const query = "DELETE FROM reservations WHERE id = ?";
    const [result] = await pool.query(query,[id]);
    if(result.affectedRows === 0){
        return false;
    }
    return result
}
const findAvailableRooms = async (start_date, end_date) => {
  const select = "SELECT * FROM rooms WHERE id NOT IN (SELECT room_id FROM reservation_rooms WHERE NOT (? <= start_date OR ? >= end_date))";
  const [result] = await pool.query(select, [end_date, start_date]);
  if(result.length === 0){
    return false
  }
  return result;
};

const findResourcePriceById = async (resourceId) => {
    const select = "SELECT price FROM resources WHERE id = ?";
    const [result] = await pool.query(select, [resourceId]);
    if (result.length === 0) {
        return false;
    }
    return result[0].price;
};

module.exports = {createReservationId, findIdAndPriceByNumber, addReservation, deleteReservation, checkOverlap, getAll, getReservationByUserId, updateReservation, setTotalReservation, checkOverlapEdit, findReservationId, recalculateTotal, deleteById, findAvailableRooms, findResourcePriceById}