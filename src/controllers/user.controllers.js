const userM = require("../models/user.models");
const bcrypt = require("bcrypt");

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

module.exports = {registerUser}