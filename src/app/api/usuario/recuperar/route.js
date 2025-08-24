// --------------------------------------------- IMPORTS
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt'
import { sendRecoveryEmail } from '@/lib/mailer'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET;

// --------------------------------------------- MÉTODOS HTTP

// Solicitar recuperación de contraseña
export async function POST(request) {
    try {
        const body = await request.json();
        const { correo } = body;

        if (!correo) {
            return NextResponse.json({ error: "Falta proporcionar un correo" });
        }

        const usuario = await prisma.usuario.findUnique({
            where: { correo: correo }
        });

        if (!usuario) {
            return NextResponse.json({ error: "No existe un usuario con esa dirección de correo" })
        }

        const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: "2h" });

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                tokenRecuperacion: token
            }
        })

        await sendRecoveryEmail(correo, token);

        return NextResponse.json({
            mensaje: "Si tu correo es correcto, revisa la bandeja de entrada del mismo"
        })

    } catch (error) {
        console.error({ message: "Error interno" })
        return NextResponse.json({ error: "Sucedio un problema al tratar de recuperar el password" })
    }
}

// Actualizar contraseña (al intentar recuperación por correo)
export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token")

        const body = await request.json();
        const { password } = body;

        if (!token) {
            return NextResponse.json({ error: "Error al recuperar contraseña" })
        }

        if (!password) {
            return NextResponse.json({ error: "Faltan campos por rellenar" })
        }

        const passwordHasheada = await bcrypt.hash(password, 10)

        await prisma.usuario.update({
            where: { tokenRecuperacion: token },
            data: {
                password: passwordHasheada,
                tokenRecuperacion : null
            }
        })

        return NextResponse.json({ mensaje: "Contraseña actualizada con éxito" })
    } catch (error) {
        console.error({ message: "Error interno" })
        return NextResponse.json({ error: "Sucedio un problema al tratar de actualizar el password" })
    }
}