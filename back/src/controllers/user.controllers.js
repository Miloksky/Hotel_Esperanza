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
            role: selectedUser[0].role
        }
        const token = createToken(infoToken);

        res.status(200).json(token);
        
    }   catch (error) {
        console.log(error);
            res.status(500).json(error)   
            
        }

} 

const getProfile = async (req,res) => {
    const id = req.userLogin.id;

    const foundUser = await userM.findById(id);
    if(!foundUser){
        return res.status(404).json({
                msg:"usuario no encontrado"
                });
    }
    res.status(200).json({
        success: true,
        data:  foundUser,
    });
    
}
// posible cambio : ruta especial para cambiar contraseña, para no obligar al usuario a cambiarla siempre 
const editUser = async (req,res) => {
    const {id} = req.params;
    let {name, email, password, phone, document} = req.body;
    phone = phone || null;
    document = document || null;

    if(Number(id) !== req.userLogin.id && req.userLogin.role !== 'admin'){
        return res.status(403).json({
            msg:"no puedes modificar a otros usuarios"
        });
    }

    password = bcrypt.hashSync(password,10);

    const updatedUser = await userM.updateUser(id, name, email, password, phone, document);
    if(!updatedUser){
        return res.status(400).json({
            msg : "no se ha podido actualizar el usuario"
        });
    }

    res.status(200).json({
        success : true,
        msg:"usuario actualizado correctamente"
    })

}

const deactivateUser = async(req,res)=>{
    const {id} = req.params;
     if(Number(id) !== req.userLogin.id && req.userLogin.role !== "admin"){
        return res.status(403).json({
            msg:"No tienes permiso para desactivar este usuario"
        });
    }
    const deactivatedUser = await userM.changeStatus(id,0);

    if(!deactivatedUser){
        return res.status(400).json({
            msg:"no se ha podido desactivar el usuario"
        });
    }

    res.json({
        success: true,
        msg: "Usuario desactivado correctamente"

    });


}

const reactivateUser = async(req,res)=>{
 try {
       const {id} = req.params;
        if(req.userLogin.role !== "admin"){
        return res.status(403).json({
            msg:"No tienes permiso para reactivar usuarios"
        });
    }

    const reactivatedUser = await userM.changeStatus(id,1);
     if(!reactivatedUser){
        return res.status(400).json({
            msg:"no se ha podido reactivar el usuario"
        });
    }

    res.status(200).json({
        success: true,
        msg: "Usuario reactivado correctamente"

    });
 } catch (error) {
    console.log(error);
 }


}



module.exports = {registerUser, login, getProfile, editUser, deactivateUser, reactivateUser}