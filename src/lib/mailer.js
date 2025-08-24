import nodemailer from 'nodemailer';

async function sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS,
        }
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuario/verificar?token=${token}`

    const mailOptions = {
        from: '"Chaty App" <celi.fioretti.12@gmail.com>',
        to: email,
        subject: 'Verificá tu cuenta',
        html: `
        <h2> ¡Bienvenido a Chaty App! </h2>
        <p> Hacé click en el siguiente enlace para verificar tu cuenta: </p>
        <a href="${verificationUrl}">Verificar cuenta</a>
        <p>Este enlace expirará en 2 horas.</p>
        `
    }

    await transporter.sendMail(mailOptions);

}

module.exports = sendVerificationEmail;
