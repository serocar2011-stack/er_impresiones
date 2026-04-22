
import React from 'react'
import Header from "../components/layouts/Header"
import Nav from "../components/layouts/Nav"
import Footer from "../components/layouts/Footer"
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
