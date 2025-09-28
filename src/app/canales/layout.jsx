'use client'

import SideBar from "@/components/SideBar";
import { SidebarContext } from '@/context/SidebarContext';
import { useState } from "react";

export default function CanalesLayout({ children }) {

  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className="">
        <SideBar />
        <main className={`min-h-screen transition-all duration-300 ${isExpanded ? 'pl-16 md:pl-52 lg:pl-16' : 'pl-16 sm:pl-16 md:pl-16'}`}>
          {children}
        </main>
      </div>
    </SidebarContext.Provider>

  );
}