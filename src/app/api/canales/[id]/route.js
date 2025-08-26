// --------------------------------------------- IMPORTS
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// --------------------------------------------- MÉTODOS HTTP

// Obtiene los detalles de 1 canal
export async function GET(request, { params }) {
    try {
        const parametros = await params;
        const idCanal = parametros.id;

        const canal = await prisma.canal.findUnique({
            where: {id : Number(idCanal)}
        });

        if(!canal) {
            return NextResponse.json({ error: "No se encontró ningun canal" })
        }

        const mensajesCanal = await prisma.mensaje.findMany({
            where : {canalId : Number(idCanal)}
        })

        return NextResponse.json({
            canal : canal,
            mensajesCanal
        })

    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: `Sucedio un error al obtener datos del canal ${canalId}` })
    }
}

// Eliminar 1 canal
export async function DELETE(request, {params}) {
    try {
        const parametros = await params;
        const canalId = parametros.id;

        const canal = await prisma.canal.findUnique({
            where: {id : Number(canalId)}
        });

        const canalEliminado = await prisma.canal.delete({
            where : {id : Number(canal.id)}
        })

        return NextResponse.json({
            mensaje: "Canal eliminado con éxito",
            canalEliminado : canalEliminado
        })

    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: `Sucedio un error al borrar canal` })
    }
}

// Actualiza el nombre de 1 canal
export async function PUT(request, {params}) {
    try {
        const body = await request.json();
        const {nombre} = body;

        const parametros = await params;
        const canalId = parametros.id;

        const canal = await prisma.canal.findUnique({
            where: {id : Number(canalId)}
        });

        const canalActualizado = await prisma.canal.update({
            where : {id : Number(canal.id)},
            data : {
                nombre : nombre
            }
        })

        return NextResponse.json({
            mensaje: "Canal actualizado correctamente",
            canalAnterior: canal,
            canalActualizado : canalActualizado
        })

    } catch (error) {
        console.error({ message: "Error interno" }, error);
        return NextResponse.json({ error: `Sucedio un error actualizar el canal` })
    }
}