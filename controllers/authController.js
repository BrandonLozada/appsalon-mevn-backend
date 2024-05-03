import User from '../models/User.js'
import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {
    // Validate the request body.
    if(Object.entries(req.body).length === 0) {
        const error = new Error('Cuerpo de la petición inválido.')
        return res.status(400).json({ message: error.message })
    }

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
    if(password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`La contraseña debe contener ${MIN_PASSWORD_LENGTH} caracteres cómo mínimo.`)
        return res.status(400).json({ message: error.message })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token } = result
        await sendEmailVerification({ name, email, token })

        res.status(201).json({
            message: 'Te has registrado correctamente, revisa la bandeja de entrada de tu correo electrónico.'
        })
    } catch (error) {
        // TODO: Create a dictionary to manage all the response status code by passing the "error.code".
        return res.status(400).json({
            message: error.message
        })
    }
}

const verifyAccount = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Hubo un error, token no válido.')
        return res.status(401).json({
            message: error.message
        })
    }

    // If the token is valid, confirm the account.
    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({ message: 'Usuario confirmado correctamente.' })
    } catch (error) {
        console.log(error.message)
    }
}

const signIn = async (req, res) => {
    // Validate the request body.
    if(Object.entries(req.body).length === 0) {
        const error = new Error('Cuerpo de la petición inválido.')
        return res.status(400).json({ message: error.message })
    }

     // Validate all fields.
    if(Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios.')
        return res.status(400).json({ message: error.message })
    }

    const { email, password } = req.body
    if(!password || !email) {
        const error = new Error('Las credenciales son necesarias.')
        return res.status(401).json({
            message: error.message
        })
    }

    // Validate if the user exists.
    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('El usuario no existe.')
        return res.status(404).json({
            message: error.message
        })
    }

    // Validate if the user confirmed their account.
    if(!user.verified) {
        const error = new Error('Tu cuenta no ha sido confirmada aún.')
        return res.status(403).json({
            message: error.message
        })
    }

    // Compare the password.
    if (await user.checkPassword(password)) {
        const token = generateJWT(user._id)
        res.json({ token })
    } else {
        const error = new Error('La contraseña es incorrecta.')
        return res.status(401).json({
            message: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('No existe usuario con el correo proporcionado.')
        return res.status(404).json({
            message: error.message
        })
    }

    try {
        user.token = uniqueId()
        const result = await user.save()

        await sendEmailPasswordReset({
            name: result.name,
            email: result.email,
            token: result.token
        })

        res.json({
            message: 'Hemos enviado un mensaje de correo con las instrucciones.'
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyPasswordResetToken = async (req, res) => {
    const { token } = req.params

    const isValidToken = await User.findOne({ token })
    if(!isValidToken) {
        const error = new Error('Hubo un error, token no válido.')
        return res.status(400).json({
            message: error.message
        })
    }

    res.json({ message: 'Token válido.'})
}

const updatePassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Hubo un error, token no válido.')
        return res.status(400).json({
            message: error.message
        })
    }

    try {
        user.token = ''
        user.password = password
        await user.save()
        res.json({ message: 'Contraseña restablecida correctamente.' })
    } catch (error) {
        console.log(error)
    }
}

const user = async (req, res) => {
    const { user } = req
    res.json(
        user
    )
}

export {
    register,
    verifyAccount,
    signIn,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    user
}