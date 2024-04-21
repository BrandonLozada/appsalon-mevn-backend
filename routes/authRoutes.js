import express from 'express'
import { register, verifyAccount, signIn, user } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Rutas de autenticación y registro de usuarios.

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/sign-in', signIn)


// Área privada - Requiere un JWT
router.get('/user', authMiddleware, user)


export default router