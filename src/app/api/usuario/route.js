import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const res = await prisma.usuario.findMany()
    return NextResponse.json(res)
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { nombre } = body;

        if (!nombre) {
            return NextResponse.json({
                error : "Falta agregar el nombre" 
            })
        }

        const nuevoUsuario = await prisma.usuario.create({
            data : {nombre}
        })

        return NextResponse.json(nuevoUsuario)

    } catch (error) {
        console.error("Error al crear usuario ", error)
        return NextResponse.json({error: "Error interno"})
    } 
}
