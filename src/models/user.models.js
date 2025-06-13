const pool = require("../config/connection");


const findEmail = async (email)=>{
    const EmailInDb = "SELECT * FROM users WHERE email = ?";
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

module.exports = {addUser,findEmail}