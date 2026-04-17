import { createBrowserRouter } from "react-router-dom";
import Home from "../src/pages/Home"
import Layout from "./pages/Layout"
import Imprimir from "./pages/Imprimir";
import Libreria from "./pages/Libreria";
import Galeria from "./pages/Galeria";
import Contacto from "./pages/Contacto";
import AddProductPage from "./pages/AddProductPage";


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
  }
]);

export default router

