const {verifyToken} = require("../utils/jwt");

const checkToken = (req, res, next) => {
    
    if(!req.headers.authorization){
        return res.json({
            success: false,
            msg: "el token es obligatorio"
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    const resulToken = verifyToken(token);
    if(!resulToken){
        return res.json({
            msg: "token incorrecto"
        });
    }

    req.userLogin = resulToken;
    next();
}

// Middleware que requiere que el usuario sea admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
};

module.exports = {
  checkToken,
  authorizeAdmin
};


