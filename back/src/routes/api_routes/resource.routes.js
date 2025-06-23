const express = require('express');
const router = express.Router();
const resourcesC = require('../../controllers/resources.controllers')

router.get('/show/resource', resourcesC.getAllResources);
router.get('/show/resource/:id', resourcesC.getResourcesById);
router.post('/create/resource', resourcesC.createResource);
router.put('/update/resource/:id', resourcesC.updateResource);
router.delete('/delete/resource/:id', resourcesC.deleteResource);

module.exports = router;