'use client'

import SideBar from "@/components/SideBar";

export default function CanalesLayout({ children }) {

  return (
    <div>
      <SideBar />
      
      <main className={`bg-zinc-800 min-h-screen `}>
        {children}
      </main>
    </div>
  );
}