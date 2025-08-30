'use client'

import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function CanalesComponent() {
    const router = useRouter();

    const [canales, setCanales] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [autenticando, setAutenticando] = useState(true);

    async function cargarCanales() {
        try {
            const res = await fetch('/api/canales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (res.ok) {
                setCanales(data.canales);
            } else {
                setMensaje(data.error || 'Error al cargar canales')
            }
        } catch (error) {
            setMensaje('Ocurrio un error al cargar los canales')
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login')
        } else {
            cargarCanales();
            setAutenticando(false);
            console.log(canales)
        }
    }, [])

    if (autenticando) {
        return (
            <div className='flex justify-center items-center h-screen text-white'>
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className='text-center '>
            <h1 className='canales text-zinc-50 text-3xl p-5 '>Bienvenido a Chaty</h1>
            <h2 className='mt-5 text-xl text-white'>Escoge un canal para empezar a chatear</h2>
            <div className=' mt-5 text-xl text-white flex gap-x-20 items-center justify-center flex-wrap mb-10'>
                {canales.map(canal => (
                    <Link key={canal.id} href={`/canales/${canal.id}`} className='items-canales text-zinc-900 p-5 w-1/2 cursor-pointer m-3 rounded'>
                        <h2 className='uppercase text-2xl font-extrabold'>{canal.nombre}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CanalesComponent