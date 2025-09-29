import React from 'react'
import LoginForm from '@/components/LoginForm'

function LoginPage() {

    return (
        <div className='flex items-center justify-center h-screen w-screen login'>
            <div className='bg-white/10 text-gray-100 p-8 rounded-xl shadow-xl w-96 mx-auto'>
                <LoginForm/>

            </div>
        </div>
    )
}

export default LoginPage;