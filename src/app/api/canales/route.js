// --------------------------------------------- IMPORTS
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// --------------------------------------------- MÉTODOS HTTP

// Crea un nuevo canal
export async function POST(request) {
    try {
        
        const body = await request.json();
        const { nombre } = body;

        if(!usuarioId) {
            return NextResponse.json({ error: "Acceso restringido" }, {status: 400});
        }

        if (!nombre) {
            return NextResponse.json({ error: "Faltan campos por rellenar" }, {status: 400});
        }

        const nuevoCanal = await prisma.canal.create({
            data: { nombre }
        })

        return NextResponse.json({
            mensaje: "canal creado exitosamente",
            usuarioCreador: usuarioId,
            canal: {
                id: nuevoCanal.id,
                nombre: nuevoCanal.nombre,
                mensajes: nuevoCanal.mensajes
            }
        })

    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: "Sucedio un error al crear un canal" }, {status: 500})
    }
}

// Obtiene todos los canales
export async function GET(request) {
    try {
        const canales = await prisma.canal.findMany();

        return NextResponse.json({
            canales: canales
        })
    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: "Sucedio un error al obtener los canales"}, {status: 500})
    }
}