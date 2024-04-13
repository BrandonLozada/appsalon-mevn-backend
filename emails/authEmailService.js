import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification() {
    const transporter = createTransport(
        'sandbox.smtp.mailtrap.io',
        2525,
        'f1dbae63b435a0',
        '523525ee1ebb3a'
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: 'correo@correo.com',
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'App Salon - Confirma tu cuenta',
        html: '<p>Probando envío email</>'
    })

    console.log('Mensaje enviado', info.messageId)
}