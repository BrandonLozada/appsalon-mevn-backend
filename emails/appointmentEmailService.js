import { createTransport } from '../config/nodemailer.js'

export async function sendEmailNewAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'AppSalon <noreply@citas-appsalon.com',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Nueva cita',
        text: 'App Salon - Nueva cita',
        html: `<p>Hola Admin, tienes una nueva cita</p>
                <p>La cita será el día ${date} a las ${time} horas.</p>`
    })

    console.log('Mensaje envíado', info.messageId)
}

export async function sendEmailUpdateAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'AppSalon <noreply@citas-appsalon.com',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Cita actualizada',
        text: 'App Salon - Cita actualizada',
        html: `<p>Hola Admin, un usuario ha modificado una cita</p>
                <p>La nueva cita será el día ${date} a las ${time} horas.</p>`
    })

    console.log('Mensaje envíado', info.messageId)
}

export async function sendEmailCancelAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'AppSalon <noreply@citas-appsalon.com',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Cita cancelada',
        text: 'App Salon - Cita cancelada',
        html: `<p>Hola Admin, un usuario ha cancelado una cita</p>
                <p>La cita estaba programada para el día ${date} a las ${time} horas.</p>`
    })

    console.log('Mensaje envíado', info.messageId)
}