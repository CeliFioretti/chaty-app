import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS,
        }
    });

export async function sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuario/verificar?token=${token}`

    const mailOptions = {
        from: '"Chaty App" <celi.fioretti.12@gmail.com>',
        to: email,
        subject: 'Verificá tu cuenta',
        html: `
        <h2> ¡Bienvenido a Chaty App! </h2>
        <p> Hacé click en el siguiente enlace para verificar tu cuenta: </p>
        <a href="${verificationUrl}" style="background-color: rgb(98, 122, 255); font-weight: bold; padding: 7px; text-align: center;">Verificar cuenta</a>
        <p>Este enlace expirará en 2 horas.</p>
        `
    }

    await transporter.sendMail(mailOptions);

}

export async function sendRecoveryEmail(email, token) {
    const recoveryUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/usuario/recuperar?token=${token}`;

    const mailOptions = {
        from: '"Chaty App" <celi.fioretti.12@gmail.com>',
        to: email,
        subject: 'Recupera tu contraseña',
        html: `
        <h2> Restablece tu contraseña de Chaty App </h2>
        <p> Hacé click en el siguiente enlace para actualizar tu cuenta: </p>
        <a href="${recoveryUrl}" style="background-color: rgb(98, 122, 255); font-weight: bold; padding: 7px; text-align: center;">Recuperar contraseña</a>
        <p>Este enlace expirará en 2 horas.</p>
        `
    }

    await transporter.sendMail(mailOptions);
}
