const express = require('express');
const { getAllResources, getResourcesById, createResource, updateResource, deleteResource } = require('../../controllers/resources.controllers');
const router = express.Router();


router.get('/show/resource', getAllResources);
router.get('/show/resource/:id', getResourcesById);
router.post('/create/resource', createResource);
router.put('/update/resource/:id', updateResource);
router.delete('/delete/resource/:id', deleteResource);

module.exports = router;