require('dotenv').config()
const nodemailer = require('nodemailer')

exports.verifyEmail = (email: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
            user: 'beatitlogin@gmail.com',
            pass: 'rssxtmdnpeqqrnvg'
        }
    })

    const mailOptions = {
        from: 'beatitlogin@gmail.com',
        to: email,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions)
}