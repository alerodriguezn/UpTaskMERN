import { text } from "express";
import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    const {email, nombre, token} = datos
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Info del email

    const info = await transport.sendMail({
        from: '"UpTask Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask Confirma tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, comprueba tu email en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>

        <p>Si no creaste esta cuenta, puede ignorar este mensaje</p>
        `
    })
}


export const emailOlvidePassword = async (datos) => {
    const {email, nombre, token} = datos
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Info del email

    const info = await transport.sendMail({
        from: '"UpTask Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask Reestablece tu Password",
        text: "Reestablece tu Password en UpTask",
        html: `<p>Hola: ${nombre} Restablece tu Password</p>
        <p>Reestablece tu Password en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password</a>

        <p>Si no solicitaste esto, ignora el mensaje</p>
        `
    })
}

