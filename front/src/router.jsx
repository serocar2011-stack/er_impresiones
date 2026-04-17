import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../src/pages/Home"
import Layout from "./pages/Layout"
import Imprimir from "./pages/Imprimir";
import Libreria from "./pages/Libreria";
import Galeria from "./pages/Galeria";
import Contacto from "./pages/Contacto";
import AddProductPage from "./pages/AddProductPage";

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminImpresiones from "./pages/admin/AdminImpresiones";
import AdminLibreria from "./pages/admin/AdminLibreria";
import ProtectedRoute from "./components/admin/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "Imprimir",
        element: <Imprimir />
      },
      {
        path: "Libreria",
        element: <Libreria />
      },
      
      {
        path: "Galeria",
        element: <Galeria />
      },
      {
        path: "Contacto",
        element: <Contacto/>
      },


      {path:"agregar-producto",
        element: <AddProductPage/>
      },

    ]
  },
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Navigate to="impresiones" replace />
      },
      {
        path: "dashboard/impresiones",
        element: <AdminImpresiones />
      },
      {
        path: "dashboard/libreria",
        element: <AdminLibreria />
      }
    ]
  }
]);

export default router

