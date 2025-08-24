// --------------------------------------------- IMPORTS
// Para la respuesta y usar Prisma
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Hasheo de contraseña
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import sendVerificationEmail from '@/lib/mailer'


// --------------------------------------------- MÉTODOS HTTP
// Obtiene todos los usuarios
export async function GET() {
    const res = await prisma.usuario.findMany()
    return NextResponse.json(res)
}

// Crea un nuevo usuario
export async function POST(request) {
    try {
        const body = await request.json();
        const { nombre, correo, password } = body;

        if (!nombre || !correo || !password) {
            return NextResponse.json({
                error : "Faltan campos obligatorios" 
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = uuidv4();

        const nuevoUsuario = await prisma.usuario.create({
            data : {
                nombre,
                correo,
                password : hashedPassword,
                verificationToken,
                emailVerified: false
            }
        })

        await sendVerificationEmail(correo, verificationToken)

        return NextResponse.json({
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            },
            mensaje: 'Usuario creado. Verificá tu correo para activar la cuenta'
        })

    } catch (error) {
        console.error("Error al crear usuario ", error)
        return NextResponse.json({error: "Error interno"})
    } 
}
