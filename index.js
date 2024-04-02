import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

// Environment variables
dotenv.config()

// Configure the app.
const app = express()

// Connect to DB
db()

// Define a route.
app.use('/api/services', servicesRoutes)

// Define port
const PORT = process.env.PORT || 4000

// Run the app
app.listen(PORT, () => {
    console.log(colors.blue('El servidor se está ejecutando en el puerto:', colors.blue.bold(PORT)))
})