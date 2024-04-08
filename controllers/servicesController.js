import mongoose from 'mongoose'
import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

const createService = async (req, res) => {
    if(Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios.')
        return res.status(400).json({
            message: error.message
        })
    }

    try {
        const service = new Services(req.body)
        await service.save()
        res.json({
            message: 'El servicio se creó correctamente.'
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services)
    } catch (error) {
        console.log(error)
    }
}

const getServiceById = async (req, res) => {
    const { id } = req.params
    // Validar un Object id.
    if(validateObjectId(id, res)) return

    // Validar que existe.
    const service = await Services.findById(id)
    if(!service) {
        return handleNotFoundError('El servicio no existe.', res)
    }

    // Mostra el servicio.
    res.json(service)
}

const updateService = async (req, res) => {
    const { id } = req.params
    // Validar un Object id.
    if(validateObjectId(id, res)) return

    // Validar que existe.
    const service = await Services.findById(id)
    if(!service) {
        return handleNotFoundError('El servicio no existe.', res)
    }

    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()
        res.json({
            message: 'El servicio se actualizó correctamente.'
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

const deleteService = async (req, res) => {
    const { id } = req.params
    // Validar un Object id.
    if(validateObjectId(id, res)) return

    // Validar que existe.
    const service = await Services.findById(id)
    if(!service) {
        return handleNotFoundError('El servicio no existe.', res)
    }

    // Eliminar registro.
    try {
        await service.deleteOne()
        res.json({
            message: 'El servicio se eliminó correctamente.'
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export {
    getServices,
    createService,
    getServiceById,
    updateService,
    deleteService
}