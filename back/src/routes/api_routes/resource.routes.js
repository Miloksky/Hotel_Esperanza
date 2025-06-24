const express = require('express');
const router = express.Router();

const {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} = require('../../controllers/resources.controller');

// Obtener todos los recursos
router.get('/', getAllResources);

// Crear un recurso
router.post('/', createResource);

// Actualizar un recurso por id
router.put('/:id', updateResource);

// Eliminar un recurso por id
router.delete('/:id', deleteResource);


//  solo uno 
router.get('/:id', getResourceById);


module.exports = router;



