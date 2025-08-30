import SideBar from "@/components/SideBar";

export default function CanalesLayout({ children }) {
  return (
    <div>
        <SideBar/>
        <main className="ml-44 w-full bg-zinc-800 min-h-screen">
            {children}
        </main>
    </div>
  );
}