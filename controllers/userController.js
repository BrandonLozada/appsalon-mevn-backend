import Appointment from "../models/Appointment.js"

const getUserAppointments = async (req, res) => {
    const { user } = req.params

    if(user !== req.user._id.toString()) {
        const error = new Error('Acceso denegado.')
        return res.status(401).json({ message: error.message })
    }

    try {
        // TODO: Aplicar "sort" también a la propiedad "time" para ordenarla de menor a mayor
        //       pero haciendo replace al caracter ":" para que nos quede solo la hora y luego convertir en número con "try", ya sea en el backend o front.
        const appointments = await Appointment.find({
            user,
            date: {
                $gte : new Date()
            }
        }).populate('services').sort({ date: 'asc' })

        res.json(appointments)
    } catch (error) {
        console.log(error)
    }
}

export {
    getUserAppointments
}