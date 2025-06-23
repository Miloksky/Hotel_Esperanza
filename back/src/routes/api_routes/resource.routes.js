const express = require('express');
const router = express.Router();
const resourceController = require('../../controllers/resources.controller');
const { checkToken, authorizeAdmin } = require('../../middleware/auth');
// rutas si fuera publico
router.get('/', resourceController.getAllResources);
router.post('/', resourceController.createResource);
router.put('/:id', resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);

// rutas de este crud al que solo puede acceder un admin ya que es quien



// // Rutas protegidas
// router.get('/', authenticateToken, authorizeAdmin, resourceController.getAllResources);
// router.post('/', authenticateToken, authorizeAdmin, resourceController.createResource);
// router.put('/:id', authenticateToken, authorizeAdmin, resourceController.updateResource);
// router.delete('/:id', authenticateToken, authorizeAdmin, resourceController.deleteResource);

module.exports = router;
