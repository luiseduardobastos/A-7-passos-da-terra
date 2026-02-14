import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import App from "./App";
import Pagamentos from "./pages/Pagamentos";
import Relatorios from "./pages/Relatorios";
import Mapa from "./pages/Mapa";
import Administrador from "./pages/Administrador";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListFalecidos from "./pages/falecidos/ListFalecidos";
import CreateFalecido from "./pages/falecidos/CreateFalecido";
import UpdateFalecido from "./pages/falecidos/UpdateFalecido";
import DeleteFalecido from "./pages/falecidos/DeleteFalecido";

const AppLayout = () => {
    return (
        <SidebarLayout>
            <Outlet />
        </SidebarLayout>
    );
};

const ProtectedLayout = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <AppLayout />;
};

export default function AppRoutes() {

    return (

        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/cadastrar"
                    element={<Cadastro />}
                />

                <Route element={<ProtectedLayout />}>
                    <Route 
                        path="/dashboard" 
                        element={ <App /> } 
                    />
                    
                    <Route 
                        path="/relatorios" 
                        element={ <Relatorios /> } 
                    />

                    <Route 
                        path="/mapa" 
                        element={ <Mapa /> } 
                    />

                    <Route 
                        path="/administrador" 
                        element={ <Administrador /> } 
                    />
                    
                    <Route 
                        path="/falecidos"
                        element={<ListFalecidos />}
                    />

                    <Route 
                        path="/pagamentos" 
                        element={ <Pagamentos /> } 
                    />

                    <Route
                        path="/falecidos/create"
                        element={<CreateFalecido />}
                    />

                    <Route
                        path="/falecidos/:id"
                        element={<UpdateFalecido />}
                    />

                    <Route
                        path="/falecidos/:id/delete"
                        element={<DeleteFalecido />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>


    )

}