// --------------------------------------------- IMPORTS
// Para la respuesta y usar Prisma
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Verifica usuario por correo
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({error: 'Token no encontrado'})
    }

    const usuario = await prisma.usuario.findUnique({
        where : { verificationToken : token }
    })

    if (!usuario) {
        return NextResponse.json({error: 'Token inválido o usuario no encontrado'})
    }

    await prisma.usuario.update({
        where : {id : usuario.id},
        data : {
            emailVerified : true,
            verificationToken: null
        }
    })

    return NextResponse.json({message: "Correo verificado correctamente"})

}