'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react'
import Link from 'next/link'

function SideBar() {
    const router = useRouter();
    const [autenticando, setAutenticando] = useState(true);

    useEffect(() => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                router.push('/login')
            } else {
                setAutenticando(false);
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
    <aside className='bg-zinc-900 text-white w-64 h-screen p-6 flex flex-col gap-4 fixed top-0 left-0'>
        <h2 className='text-2xl font-bold mb-6'>Chaty</h2>
        <nav className='flex flex-col gap-3'>
            <Link href='/canales' className='hover:text-amber-400'>Canales</Link>
            <Link href='/perfil' className='hover:text-amber-400'>Perfil</Link>
            <Link href='/ajustes' className='hover:text-amber-400'>Ajustes</Link>
            <button onClick={() => {
                sessionStorage.removeItem('token');
                window.location.href = '/login'
            }} className='mt-6 text-red-400 hover:text-red-600'>Cerrar sesión</button>
        </nav>
    </aside>
  )
}

export default SideBar