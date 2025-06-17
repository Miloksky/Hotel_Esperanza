const pool = require("../config/connection");


const findEmail = async (email)=>{
    const EmailInDb = "SELECT * FROM users WHERE email = ? AND is_active = 1";
    const [result] = await pool.query(EmailInDb,[email]);
    if(result.length === 0){
        return false
    }
    return result;

}




const addUser = async (name, email, password, phone, document)=>{
    const insert = "INSERT INTO users (name, email, password, phone, document) VALUES (?, ?, ?, ?,?)";

    const [result]= await pool.query(insert,[name, email, password, phone, document]);
    if (result.affectedRows === 0){
        return false;
    }
    return result;
 }


 const findById = async(id) => {
    const select = "SELECT * FROM users WHERE id = ? AND is_active = 1";
    const [result] = await pool.query(select,[id]);
    if(result.length === 0){
        return false;
    }

    return result;

 }


 const updateUser = async(id, name, email, password, phone, document) => {
    const findAndUpdate = "UPDATE users SET name = ?, email = ?, password = ?, phone = ?, document = ? WHERE id = ?";

    const [result] = await pool.query(findAndUpdate,[name, email, password, phone, document,id]);
    if(result.affectedRows === 0){
        return false
    }
    return result;
 }


 const changeStatus = async (id,status) => {
    const updateStatus = "UPDATE users SET is_active = ? WHERE id = ?";
    const [result] = await pool.query(updateStatus,[status, id]);
    if(result.affectedRows === 0){
        return false;
    }
    return result;
 }
 

module.exports = {addUser,findEmail,findById,updateUser,changeStatus}