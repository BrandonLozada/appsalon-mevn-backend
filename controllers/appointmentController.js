import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from '../models/Appointment.js'

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
    }}).select('time')

    res.json(appointments)
}

export {
    createAppointment,
    getAppoinmentsByDate
}