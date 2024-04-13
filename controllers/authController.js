import User from '../models/User.js'

const register = async(req, res) => {


    // Validate all fields.
    if(Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios.')
        return res.status(400).json({ message: error.message })
    }

    const { email, password, name } = req.body
    // Avoid duplicate records.
    const userExists = await User.findOne({ email })
    if(userExists) {
        const error = new Error('Usuario ya registrado anteriormente.')
        return res.status(400).json({ message: error.message })
    }

    // Validate the password extension.
    const MIN_PASSWORD_LENGTH = 8
    Object.freeze(MIN_PASSWORD_LENGTH)
    if(password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`La contraseña debe contener ${MIN_PASSWORD_LENGTH} caracteres cómo mínimo.`)
        return res.status(400).json({ message: error.message })
    }

    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({
            message: 'Te has registrado correctamente, revisa la bandeja de entrada de tu correo electrónico.'
        })
    } catch (error) {
        // TODO: Create a dictionary to manage all the response status code by passing the "error.code".
        return res.status(400).json({
            message: error
        })
    }
}

export {
    register
}