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

export {
    createAppointment
}