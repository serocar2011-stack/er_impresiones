import "../../styles/Nav.css"
import { NavLink } from "react-router-dom"

function Nav () {

  return (
    <nav>
      <ul className="nav_container">

        <li>
          <NavLink to="/">
            <button>INICIO</button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Imprimir">
            <button>IMPRIMIR</button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Libreria">
            <button>LIBRERIA</button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Galeria">
            <button>GALERIA</button>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Contacto">
            <button>CONTACTO</button>
          </NavLink>
        </li>

      </ul>
    </nav>
  )
}

export default Nav