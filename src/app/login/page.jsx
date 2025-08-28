import React from 'react'
import LoginForm from '@/app/components/LoginForm'

function LoginPage() {
    

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='bg-white/10 text-gray-100 p-8 rounded-xl shadow-xl w-96 mx-auto'>
                {/** Titulo de Login */}
                <h1 className='text-4xl font-bold text-center'>Chaty</h1>
                <h2 className='text-2xl text-center '>Iniciar sesión</h2>

                {/** Form */}
                <LoginForm/>

            </div>
        </div>
    )
}

export default LoginPage;