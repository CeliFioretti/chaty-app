import React from 'react'
import Link from 'next/link'

function PaginaNoEncontrada() {
    return (
        <div className='text-center flex flex-col h-screen justify-center'>
            <div className='p-10 bg-gray-700 w-fit mx-auto '>
                <h2 className='text-7xl font-bold'>Error 404</h2>
                <p className='mb-5'>Página no encontrada</p>
                <Link href="/" className='hover:text-blue-400 text-blue-500 uppercase'>Volver al inicio</Link>
            </div>
        </div>
    )
}

export default PaginaNoEncontrada