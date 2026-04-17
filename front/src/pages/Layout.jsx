
import React from 'react'
import Header from "../components/Layouts/Header"
import Nav from "../components/Layouts/Nav"
import Footer from "../components/Layouts/Footer"
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
<header>
    <Header/>
</header>
<nav>
    <Nav/>
</nav>


<main>
    <Outlet/>
</main>

<footer>
    <Footer/>
</footer>

</>
  )
}

export default Layout
