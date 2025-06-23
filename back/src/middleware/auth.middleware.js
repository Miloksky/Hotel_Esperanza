// admin
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verifica que haya token y que sea válido
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });

    req.user = user; // datos del token decodificado (id, role, etc.)
    next();
  });
};

// Middleware que requiere que el usuario sea admin
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
};

module.exports = {
  authenticateToken,
  authorizeAdmin
};
