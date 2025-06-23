const express = require('express');
const app = express();
require('dotenv').config();
const resourceRoutes = require('./routes/resource.routes');

// Middlewares globales
app.use(express.json());

// Rutas
app.use('/api/resources', resourceRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// conexion ruta admin 
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
