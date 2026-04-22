import "../../styles/Header.css"


import logo from "../../assets/img/logo.png"

function Header () {

return(

    <header className="header">
   <img src={logo} alt="logo" />
   <h1><span className="titulo permanent-marker-regular">ER</span>impresiones</h1>
    
</header>


);


}

export default Header