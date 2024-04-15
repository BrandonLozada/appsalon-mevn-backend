import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    // TODO: Put those credentials into the .env file.
    const transporter = createTransport(
        'sandbox.smtp.mailtrap.io',
        2525,
        'f1dbae63b435a0',
        '523525ee1ebb3a'
    )

    // Send the email
    const info = await transporter.sendMail({
        from: 'noreply@auth-appsalon.com',
        to: email,
        subject: 'AppSalon - Confirma tu cuenta',
        text: 'App Salon - Confirma tu cuenta',
        html: `<p>Hola ${name}, confirma tu cuenta en AppSalon</p>
                <p>Tu cuenta está casi lista, solo debes confirmarla en el siguiente enlace.</p>
                <a href="http://localhost:4000/api/auth/verify/${token}">Confirma tu cuenta</a>
                <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>`
    })
}