import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const parametros = await params
        const usuarioId = parametros.id
        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(usuarioId) }
        })

        if (!usuario) {
            return NextResponse.json({ error: "Usuario no encontrado" })
        }

        return NextResponse.json(usuario)
    } catch (error) {
        console.error("Error al buscar usuario", error)
        return NextResponse.json({ error: "Error interno" })
    }
}

export async function DELETE(request, { params }) {
    try {
        // 1.Obtenemos el usuario
        const parametros = await params
        const usuarioId = parametros.id;
        const usuario = await prisma.usuario.findUnique({
            where: { id: Number(usuarioId) }
        })
        if (!usuario) {
            return NextResponse.json({ error: "No se encontró el usuario" }, error)
        }
        // 2.Eliminamos el usuario
        const usuarioEliminado = await prisma.usuario.delete({
            where: { id: Number(usuarioId) }
        })
        // 3.Mostramos el usuario eliminado
        return NextResponse.json(`Usuario eliminado correctamente: ${usuarioEliminado.id}. ${usuarioEliminado.nombre}`)
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
        return NextResponse.json({ error: "Error interno" })
    }
}

export async function PUT(request, {params}) {
    const body = await request.json();
    const { nombre } = body;

    // 1. Obtenemos el usuario a actualizar
    const parametros = await params
    const usuarioId = parametros.id
    const usuario = await prisma.usuario.findUnique({
        where : {id : Number(usuarioId)}
    })

    if(!usuario) {
        return NextResponse.json({error: "No se encontró el usuario"})
    }
    // 2. Editamos el usuario
    const usuarioEditado = await prisma.usuario.update({
        where : {id : Number(usuarioId)},
        data : {nombre}
    })

    // 3. Mostramos el resultado de la edicion o mensaje
    return NextResponse.json(`Usuario actualizado correctamente: ${usuario.id}. ${usuario.nombre} a ${usuarioEditado.id}. ${usuarioEditado.nombre}`)
}

