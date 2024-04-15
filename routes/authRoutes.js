import express from 'express'
import { register, verifyAccount, signIn } from '../controllers/authController.js'

const router = express.Router()

// Rutas de autenticación y registro de usuarios.

router.post('/register', register)
router.post('/verify/:token', verifyAccount)
router.post('/sign-in', signIn)

export default router