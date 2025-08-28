'use client'

import React, { useState } from 'react'

function LoginForm() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    async function realizarLogin(event) {
        event.preventDefault();
        setCargando(true);
        try {
            const res = await fetch('/api/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, password })
            })

            const data = await res.json();

            if (res.ok) {
                setMensaje(data.mensaje);
                sessionStorage.setItem('token', data.token);

            } else {
                setMensaje(data.error || 'Error desconocido');
            }
        } catch (error) {
            setMensaje('Ocurrio un error al conectar con el servidor')
        } finally {
            setCargando(false);
        }
    }
    return (
        <div>
            <form onSubmit={realizarLogin} method="POST">
                <div className='flex flex-col mt-8'>

                    <input placeholder='Usuario' className='bg-amber-50 rounded h-8 text-zinc-900 ps-2 mb-4' type="email" name="correo" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    <input placeholder='Contraseña' className='bg-amber-50 rounded h-8 text-zinc-900 ps-2' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button className='mt-6 p-2 bg-blue-400 rounded cursor-pointer hover:bg-blue-500 flex items-center justify-center gap-2 disabled:opacity-50' type="submit" disabled={cargando}>{cargando && <svg className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></svg>}{cargando ? 'Accediendo...' : 'Acceder'}</button>
                    {mensaje && <p className={`mt-4 text-sm ${mensaje.includes('exitoso') ? 'text-green-500' : 'text-red-500'}`}>{mensaje}</p>}
                </div>
            </form>
        </div>
    )
}

export default LoginForm