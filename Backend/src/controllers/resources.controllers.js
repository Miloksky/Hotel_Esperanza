const Resource = require('../models/resources.models');

// Obtener todos los recursos:
const getAllResources = async (req, res) => {
    try {
        const resources = await Resource.getAllResourcesFromDb();
        res.json(resources);
    } catch (error) {
        console.error('Error al obtener todos los recursos:', error); // Log para depuración
        res.status(500).json({ error: 'Error interno del servidor al obtener los recursos' });
    }
};

// Obtener un recurso por ID:
const getResourcesById = async (req, res) => {
    try {
        const resource = await Resource.getResourceByIdFromDb(req.params.id);
        if (!resource) {
            return res.status(404).json({ error: 'Recurso no encontrado' });
        }
        res.json(resource);
    } catch (error) {
        console.error('Error al obtener el recurso por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener el recurso' });
    }
};

// Crear un nuevo recurso:
const createResource = async (req, res) => {
    const { name, price } = req.body;
    try {
        const newResourceId = await Resource.createResourceInDb(name, price);
        res.status(201).json({
            id: newResourceId,
            message: 'Recurso creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear recurso:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el recurso' });
    }
};

// Actualizar recurso:
const updateResource = async (req, res) => {
    const { name, price } = req.body;
    try {
        const affectedRows = await Resource.updateResourceInDb(req.params.id, name, price);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Recurso no encontrado para actualizar' });
        }
        res.json({ message: 'Recurso actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el recurso:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar el recurso' });
    }
};

// Eliminar recurso:
const deleteResource = async (req, res) => {
    try {
        const affectedRows = await Resource.deleteResourceFromDb(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Recurso no encontrado para eliminar' });
        }
        res.json({ message: 'Recurso eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el recurso:', error);
        res.status(500).json({ error: 'Error interno del servidor al eliminar el recurso' });
    }
};

module.exports = { getAllResources, getResourcesById, createResource, updateResource, deleteResource };