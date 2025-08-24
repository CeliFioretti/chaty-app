// --------------------------------------------- IMPORTS
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// --------------------------------------------- VARIABLES
const SECRET = process.env.JWT_SECRET;

// --------------------------------------------- MÉTODOS HTTP
// Loguear un usuario
export async function POST(resquest) {
    const body = await resquest.json();
    const { correo, password } = body;

    if (!correo || !password) {
        return NextResponse.json({error : "Faltan campos por completar"})
    }

    const usuario = await prisma.usuario.findUnique({
        where : { 
            correo : correo
        }
    })

    if (!usuario) {
        return NextResponse.json({error: "No se encontró usuario con ese correo"})
    }

    const passwordVallida = await bcrypt.compare(password, usuario.password)

    if(!passwordVallida) {
        return NextResponse.json({error: "El usuario o la contraseña son incorrectas"})
    }

    const token = jwt.sign({ id: usuario.id}, SECRET, {expiresIn: "2h"} );

    return NextResponse.json({
        usuario : {
            id: usuario.id,
            nombre : usuario.nombre,
            correo : usuario.correo
        },
        token,
        mensaje: "Inicio de sesión exitoso"
    })

}