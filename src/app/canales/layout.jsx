'use client'

import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function CanalesLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSideBar() {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <main className={`bg-zinc-800 min-h-screen `}>
        {children}
      </main>
    </div>
  );
}