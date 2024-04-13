import nodemailer from 'nodemailer'

export function createTransport(host, port, /*secure,*/ user, pass) {
    return nodemailer.createTransport({
        host,
        port,
        //secure,
        auth: {
            user,
            pass,
        }
    })
}
