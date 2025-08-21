// --------------------------------------------- IMPORTS
// Para la respuesta y usar Prisma
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Hasheo de contraseña
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// --------------------------------------------- VARIABLES
// Clave única para generar token
const SECRET = process.env.JWT_SECRET;

// --------------------------------------------- MÉTODOS HTTP
// Obtiene todos los usuarios
export async function GET() {
    const res = await prisma.usuario.findMany()
    return NextResponse.json(res)
}

// Crea un nuevo usuario (hay que actualizar)
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

        const nuevoUsuario = await prisma.usuario.create({
            data : {
                nombre,
                correo,
                password : hashedPassword
            }
        })

        const token = jwt.sign({id: nuevoUsuario.id}, SECRET, {expiresIn: "2h"})

        return NextResponse.json({
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            },
            token,
        })

    } catch (error) {
        console.error("Error al crear usuario ", error)
        return NextResponse.json({error: "Error interno"})
    } 
}
