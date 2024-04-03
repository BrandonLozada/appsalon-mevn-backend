import mongoose from 'mongoose'
import { services } from '../data/beautyServices.js'
import Services from '../models/Services.js'

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

const getServices = (req, res) => {
    res.json(services)
}

const getServiceById = async (req, res) => {
    const { id } = req.params
    // Validar un Object id.
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El identificador no es válido.')

        return res.status(400).json({
            message: error.message
        })
    }

    // Validar que existe.
    const service = await Services.findById(id)
    if(!service) {
        const error = new Error('El servicio no existe.')

        return res.status(404).json({
            message: error.message
        })
    }

    // Mostra el servicio.
    res.json(service)
}

export {
    getServices,
    createService,
    getServiceById
}