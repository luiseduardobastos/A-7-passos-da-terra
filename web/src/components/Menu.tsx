import { Link, useNavigate } from "react-router-dom"
import { Home, Users, DollarSign, BarChart3, Map, User, LogOut } from "lucide-react"

import "./menu.css"

const Menu = () => {

    const navigate = useNavigate()

    const cssMenu = "flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white rounded-md"
    const cssLogout = "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white rounded-md"

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("authUser")
        navigate("/")
    }

    return(

        <div className="flex h-full flex-col">

            <nav className="space-y-2">
                <Link to="/dashboard" className={cssMenu}>
                    <Home size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/falecidos" className={cssMenu}>
                    <Users size={20} />
                    <span>Sepultamentos</span>
                </Link>
                <Link to="/pagamentos" className={cssMenu}>
                    <DollarSign size={20} />
                    <span>Pagamentos</span>
                </Link>
                <Link to="/mapa" className={cssMenu}>
                    <Map size={20} />
                    <span>Mapa</span>
                </Link>
                <Link to="/relatorios" className={cssMenu}>
                    <BarChart3 size={20} />
                    <span>Relatórios</span>
                </Link>
                <Link to="/administrador" className={cssMenu}>
                    <User size={20} />
                    <span>Administrador</span>
                </Link>
            </nav>

            <div className="mt-auto pt-6">
                <button type="button" onClick={handleLogout} className={cssLogout}>
                    <LogOut size={20} />
                    <span>Sair</span>
                </button>
            </div>

        </div>

    )

}

export default Menu