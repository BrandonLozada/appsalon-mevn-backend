import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'AppSalon <noreply@auth-appsalon.com',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'App Salon - Confirma tu cuenta',
        html: `<p>Hola ${name}, confirma tu cuenta en AppSalon</p>
                <p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace.</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirma tu cuenta</a>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>`
    })

    console.log('Mensaje envíado', info.messageId)
}

export async function sendEmailPasswordReset({ name, email, token }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'AppSalon <noreply@auth-appsalon.com',
        to: email,
        subject: 'AppSalon - Restablece tu contraseña',
        text: 'App Salon - Restablece tu contraseña',
        html: `<p>Hola ${name}, has solicitado restablecer tu contraseña</p>
                <p>Sigue el siguiente enlace para generar una nueva contraseña.</p>
                <a href="${process.env.FRONTEND_URL}/auth/olvide-contrasena/${token}">Reestablecer contraseña</a>
                <p>Si tu no solicitaste este cambio, puedes ignorar este mensaje.</p>`
    })

    console.log('Mensaje envíado', info.messageId)
}