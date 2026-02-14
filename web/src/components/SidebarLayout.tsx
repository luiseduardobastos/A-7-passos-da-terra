import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import logo from "./logo.png";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [nome, setNome] = useState("Administrador");

  const getNomeCurto = (valor: string) => {
    const partes = valor.trim().split(/\s+/).filter(Boolean);
    return partes[0] || "";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.nome) {
          setNome(getNomeCurto(parsed.nome));
        }
      } catch (error) {
        console.error("Erro ao ler usuario autenticado", error);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Responsivo */}
      <aside className="w-88 lg:w-72 bg-slate-900 text-white shadow-lg overflow-y-auto border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src={logo} 
              alt="Logo A 7 Palmos da Terra" 
              className="h-10 w-10 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis">A 7 Palmos da Terra</h1>
              <p className="text-xs text-slate-400 whitespace-nowrap">Bem vindo(a), {nome}!</p>
            </div>
          </div>
        </div>
        <nav className="p-6 flex-1">
          <Menu />
        </nav>
      </aside>

      {/* Main Content - Flex */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;
