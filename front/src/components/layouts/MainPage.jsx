import "../../styles/MainPage.css"


function MainPage () {

return (

    <>
    
    <div className="img-container">

        <img className="imagen-portada" src="src/assets/img/impresora.png" alt="portada" />

        <img className="logo_superpuesto" src="src/assets/img/logo.png" alt="logo superpuesto" />
    </div>
    
    
    <div className="presentacion">
            <h2>SOBRE NOSOTROS:</h2>
            <h3>Somos una empresa nacida en Concepción del Uruguay,  Entre Ríos en el año 2009, adquiriendo a lo largo de este tiempo una amplia esperiencia en todotipo de impresiones, ya sea sobre papel comun, autoahesivos, fotográficos y estampados de buzos y remeras. Tambien contamos con una amplia variedad de productos de librería orientados especificamente al estudiante universitario</h3>
        </div>
        
        <section> 
       <p className="title">ALGUNOS DE NUESTROS TRABAJOS</p>
    <ol className="comic-relief-regular">
        <li>Impresiones en papel comun</li>
        <li>Papeles fotograficos</li>
        <li>Estampados</li>
        <li>Stickers</li>
        <li>Plastificados</li>
    </ol>
    </section>
    <article>
           <video src="src/assets/video/Mi video.mp4"controls width="280" height="500">video</video>
 </article>
<h6 className="comic-relief-regular">CONSULTANOS POR OTROS TRABAJOS</h6>
<h6 className="comic-relief-regular">LA MEJOR CALIDAD AL MEJOR PRECIO</h6>    
  
 
       
        </>
 


   );
}

export default MainPage
