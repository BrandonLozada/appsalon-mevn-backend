import express from 'express'
import { createAppointment, getAppoinmentsByDate } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppoinmentsByDate)

export default router