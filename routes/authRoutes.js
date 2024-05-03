import express from 'express'
import { register, verifyAccount, signIn, forgotPassword,
    verifyPasswordResetToken, updatePassword, user  } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Rutas de autenticación y registro de usuarios.

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/sign-in', signIn)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)
// NOTE: Se puede implementar una funcionalidad similar para resetear/cambiar la contraseña
//       pero en lugar de ser con el token sería obteniendo el JWT del usuario autenticado,
//       en la que valide el usuario sea el mismo de la petición y que valide que no sea la anterior contraseña.


// Área privada - Requiere un JWT
router.get('/user', authMiddleware, user)


export default router