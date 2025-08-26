// --------------------------------------------- IMPORTS
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { obtenerUsuarioDesdeRequest } from "@/lib/auth";

// --------------------------------------------- MÉTODOS HTTP

// Crear mensaje en el canal
export async function POST(request, { params }) {
    const usuarioId = obtenerUsuarioDesdeRequest(request);
    const body = await request.json();
    const { mensaje } = body;

    if (!mensaje || !usuarioId) {
        return NextResponse.json({ error: "Faltan campos por completar" })
    }

    const parametros = await params;
    const canalId = parametros.id;

    if (!canalId) {
        return NextResponse.json({ error: "Canal no encontrado" })
    }
    try {
        const mensajeAgregado = await prisma.mensaje.create({
            data: {
                contenido: mensaje,
                usuarioId: Number(usuarioId),
                canalId: Number(canalId)
            },
            include: {
                canal: true
            }
        })

        return NextResponse.json({
            mensaje: `Mensaje creado correctamente`,
            mensajeAgregado
        })

    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: "Sucedio un error al crear un mensaje" })
    }
}

// Obtener todos los mensajes de un canal
export async function GET(request, { params }) {
    const parametros = await params;
    const idCanal = parametros.id;


    try {
        const canal = await prisma.canal.findUnique({
            where : {id : Number(idCanal)}
        });

        if(!canal) {
            return NextResponse.json({ error: "Canal no existente" });
        }

        const mensajesCanal = await prisma.mensaje.findMany({
            where : {canalId: Number(idCanal)},
            orderBy : {createdAt: 'asc'}
        });
        return NextResponse.json({mensajesCanal})
    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: "Sucedio un error al obtener todos los mensajes del canal" });
    }
}

// Obtener todos los mensajes de un canal
export async function GET(request, { params }) {
    const parametros = await params;
    const idCanal = parametros.id;

    try {
        const canal = await prisma.canal.findUnique({
            where : {id : Number(idCanal)}
        });

        if(!canal) {
            return NextResponse.json({ error: "Canal no existente" });
        }

        const mensajesEliminados = await prisma.mensaje.delete({
            where: {canalId : Number(idCa)}
        })

        const mensajesCanal = await prisma.mensaje.findMany({
            where : {canalId: Number(idCanal)},
            orderBy : {createdAt: 'asc'}
        });

        return NextResponse.json(
            {
                mensaje: "Mensajes de canal eliminados correctamente",
                mensajesCanalActuales : mensajesCanal
            }  
        )
    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: "Sucedio un error al borrar los mensajes del chat" });
    }
}