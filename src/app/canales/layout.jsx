'use client'

import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function CanalesLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSideBar() {
    setIsOpen(!isOpen)
  }

  return (
    <div>

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <button onClick={toggleSideBar} className='fixed top-4 left-4 z-50 bg-amber-400 text-black px-3 py-2 rouded-md'>
        {isOpen ? 'Cerrar' : 'Abrir'}
      </button>

      <main className={`bg-zinc-800 min-h-screen flex-1 transition-all duration-300 ${isOpen ? 'pl-52' : 'pl-0'}`}>
        {children}
      </main>
    </div>
  );
}