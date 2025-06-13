const userM = require("../models/user.models");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt");

const registerUser = async (req,res) => {
    try {
        
        let {name, email, password, phone, document} = req.body;

        phone = phone || null;
        document = document || null;

        const emailchecked = await userM.findEmail(email);
        if(emailchecked){
            return res.status(400).json({
             msg :" El usuario ya existe"
            })
        }

        password = bcrypt.hashSync(password,10);

        const createUser = await userM.addUser(name, email, password, phone, document);
        if(createUser){
            return res.status(200).json({
                msg:"El usuario ha sido creado correctamente",
                data : createUser.insertId
            })
        }






    } catch (error) {
        res.status(500).json(error);
    }



}


const login = async (req,res) => {
    try {
        const {email,password} = req.body;
        const selectedUser = await userM.findEmail(email);
        if(!selectedUser){
            return res.status(400).json({
                msg:"El usuario no existe"
            });
        }

        const isSame = await bcrypt.compareSync(password,selectedUser[0].password);

        if(!isSame){
            return res.status(400).json({
            msg:"contraseña incorrecta"
            })
        }

        const infoToken = {
            id: selectedUser[0].id,
            email: selectedUser[0].email,
            rol: selectedUser[0].rol
        }

        const token = createToken(infoToken);

        res.status(200).json(token);
        
    }   catch (error) {
            res.status(500).json(error)   
        }

} 



module.exports = {registerUser,login}