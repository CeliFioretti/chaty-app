'use client';
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { FaPaperPlane } from 'react-icons/fa';

function ChatComponent() {
  const { isExpanded } = useSidebar();

  return (
    <div
      className={`flex transition-all duration-300 ${
        isExpanded ? 'pl-52' : 'pl-16'
      } min-h-screen bg-zinc-800 text-white`}
    >
      {/* Panel de mensajes */}
      <div className="flex flex-col justify-between flex-1 p-6">
        {/* Mensajes */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* Ejemplo de mensaje */}
          <div className="bg-zinc-700 p-4 rounded-md w-fit max-w-[70%] self-start">
            <p className="text-sm text-zinc-300">Usuario 1</p>
            <p className="text-lg">Hola, ¿cómo estás?</p>
          </div>
          <div className="bg-blue-600 p-4 rounded-md w-fit max-w-[70%] self-end">
            <p className="text-sm text-zinc-100">Yo</p>
            <p className="text-lg">Todo bien, ¿vos?</p>
          </div>
        </div>

        {/* Input de mensaje */}
        <div className="flex items-center gap-4 mt-6">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-zinc-700 text-white p-3 rounded-md outline-none placeholder:text-zinc-400"
          />
          <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white">
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Panel de conectados */}
      <div className="w-64 border-l border-zinc-700 p-6 hidden md:flex flex-col gap-4">
        <h2 className="text-xl font-bold text-zinc-100">Conectados</h2>
        <ul className="text-zinc-300 text-sm flex flex-col gap-2">
          <li>Usuario 1</li>
          <li>Usuario 2</li>
          <li>Usuario 3</li>
        </ul>
      </div>
    </div>
  );
}

export default ChatComponent;