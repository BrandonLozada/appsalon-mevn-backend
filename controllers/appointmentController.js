import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from '../models/Appointment.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {
        const newAppointment = new Appointment(appointment)
        await newAppointment.save()
        res.status(201).json({ message: 'Tu cita se reservó correctamente.'})
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

const getAppoinmentsByDate = async (req, res) => {
    // TODO: No permitir en backend que se cree una cita con la misma fecha y hora.
    //       Solo está deshabilitado en frontend.
    const { date } = req.query
    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if(!isValid(newDate)) {
        const error = new Error('Fecha no válida.')
        return res.status(400).json({ message: error.message })
    }

    const isoDate = formatISO(newDate)

    const appointments = await Appointment.find({ date: {
        $gte : startOfDay(new Date(isoDate)),
        $lte: endOfDay(new Date(isoDate))
    }}).select('_id time')

    res.json(appointments)
}

const getAppointmentById = async (req, res) => {
    const { id } = req.params

    // Validar por ObjectId
    if(validateObjectId(id, res)) return

    // Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment) {
        return handleNotFoundError('La cita no existe.', res)
    }

    // Validar que sea el mismo usuario
    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes los permisos.')
        return res.status(403).json({ message: error.message })
    }

    // Retornar la cita
    res.json(appointment)
}

const updateAppointment = async (req, res) => {
    const { id } = req.params

    // Validar por ObjectId
    if(validateObjectId(id, res)) return

    // Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment) {
        return handleNotFoundError('La cita no existe.', res)
    }

    // Validar que sea el mismo usuario
    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes los permisos.')
        return res.status(403).json({ message: error.message })
    }

    const { date, time, totalAmount, services } = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        await appointment.save()
        res.json({ message: 'Cita actualizada correctamente.'})
    } catch (error) {
        console.log(error)
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params

    if(validateObjectId(id, res)) return

    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment) {
        return handleNotFoundError('La cita no existe.', res)
    }

    if(appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tienes los permisos.')
        return res.status(403).json({ message: error.message })
    }

    try {
        await appointment.deleteOne()
        res.json({ message: 'Cita cancelada exitosamente.'})
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export {
    createAppointment,
    getAppoinmentsByDate,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}