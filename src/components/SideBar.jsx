'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react'
import Link from 'next/link'

function SideBar({ isOpen, setIsOpen }) {
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
        <aside className={`bg-zinc-900 text-white w-52 h-screen pt-20 ps-5 flex flex-col gap-4 fixed top-0 left-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className='text-2xl font-bold mb-2'>Menú</h2>
            <nav className='flex flex-col gap-3'>
                <Link href='/canales' className='hover:text-amber-400'>Canales</Link>
                <Link href='/perfil' className='hover:text-amber-400'>Perfil</Link>
                <Link href='/ajustes' className='hover:text-amber-400'>Ajustes</Link>
                <button onClick={() => {
                    sessionStorage.removeItem('token');
                    window.location.href = '/login'
                }} className='mt-4 text-red-400 hover:text-red-600 text-start'>Cerrar sesión</button>
            </nav>
        </aside>
    )
}

export default SideBar