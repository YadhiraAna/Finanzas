// Importa los íconos que se van a usar desde FontAwesome
"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";
//import Router from "next/router";
import {useRouter} from "next/navigation";
import Header from '../../componentes/Header';

// Componente principal de la página (Home)
export default function Home() {
  //const router =useRouter();
  return (
    <>
      {/* HEADER - Encabezado principal del sitio */}
      <Header showLoginButton={true} />

      {/* SECCIÓN HERO - Presentación principal */}
      <main className="container section hero"> {/* Agrupa el texto e imagen principal */}
        <div className="hero-text"> {/* Contenedor del texto destacado */}
          <h1>
            Construye grandes metas <br /> con pequeños pasos
          </h1>
          <p>
            Administra tus gastos, ahorra más y alcanza tus metas financieras con facilidad.
          </p>
          <Link href="/log-in" className="btn-main"> {/* Botón principal de llamada a la acción */}
            Comienza ahora
          </Link>
        </div>

        <div className="hero-img"> {/* Contenedor de la imagen del hero */}
          <img src="/imgLoading.png" alt="Finanzas" /> {/* Imagen representativa del producto */}
        </div>
      </main>

      {/* SECCIÓN SABÍAS QUE - Datos curiosos o educativos */}
      <section className="sabias">
        <h2>¿SABÍAS QUE?</h2>
        <div className="sabias-grid"> {/* Grid para organizar las tarjetas de datos */}
          {/* Cada sabias-item es un bloque con una frase o estadística */}
          <div className="sabias-item">
            <p>
              Usuarios que emplean sistemas de finanzas personales ahorran en promedio 
              <strong> 10–20% más </strong> al mes según Steven Burnett.
            </p>
          </div>
          <div className="sabias-item">
            <p>
              El hábito de anotar tus gastos diarios puede ayudarte a detectar hasta 
              <strong> 30 fugas de dinero </strong> al mes.
            </p>
          </div>
          <div className="sabias-item">
            <p>
              El estrés financiero es una de las principales causas de insomnio en adultos.
            </p>
          </div>
          <div className="sabias-item">
            <p>
              Tener metas financieras claras aumenta la probabilidad de lograrlas 
              <strong> hasta 10 veces más </strong>.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN FUNCIONES - Presenta características del sistema */}
      <section className="funciones">
        <h2>Funciones</h2>
        <div className="funciones-grid"> {/* Distribuye las funciones en columnas */}
          
          {/* Cada "funcion" representa una característica */}
          <div className="funcion">
            <img src="/f1.png" alt="Organiza tus finanzas" />
            <h3>Organiza tus finanzas</h3>
            <p>Registra tus ingresos y gastos diarios para tener el control de tu dinero.</p>
          </div>

          <div className="funcion">
            <img src="/f2.png" alt="Presupuestos personalizados" />
            <h3>Presupuestos personalizados</h3>
            <p>Define un límite de gasto y recibe alertas cuando estés por superarlo.</p>
          </div>

          <div className="funcion">
            <img src="/f3.png" alt="Visualización de datos financieros" />
            <h3>Visualización de datos financieros</h3>
            <p>Visualiza gráficas para entender mejor tus hábitos de gasto.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN TESTIMONIOS - Opiniones de usuarios */}
      <section className="testimonios">
        <h2>Lo que dicen nuestros usuarios</h2>
        <p>Historias reales de personas que mejoraron sus finanzas con Pesito a Pesito</p>

        {/* Contenedor de las tarjetas de testimonios */}
        <div className="cards">
          <div className="card">
            <h4>Alejandro Corona</h4>
            <p>⭐ 4.5</p>
            <p>La interfaz es muy intuitiva y permite llevar un control detallado.</p>
          </div>
          <div className="card">
            <h4>Marisol Martínez</h4>
            <p>⭐ 4.0</p>
            <p>Me ayudó a organizar mis finanzas e integrar sincronización bancaria.</p>
          </div>
          <div className="card">
            <h4>Emilia Sánchez</h4>
            <p>⭐ 4.5</p>
            <p>El seguimiento de gastos me ayudó a ahorrar para mis vacaciones.</p>
          </div>
        </div>

        {/* Botones del carrusel de testimonios 
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <button className="carousel-btn prev">‹</button>
          <button className="carousel-btn next">›</button>
        </div>*/}
      </section>

      {/* SECCIÓN FAQ - Preguntas frecuentes */}
      <section className="faq">
        <h2>Preguntas frecuentes</h2>

        <div className="faq-container"> {/* Contenedor general con texto e imagen */}
          
          {/* Columna izquierda con preguntas */}
          <div className="faq-left">
            {/* <details> permite mostrar u ocultar contenido al hacer clic */}
            <details open>
              <summary>¿Qué puedo hacer en esta página?</summary>
              <p>Registrar ingresos, gastos y generar reportes financieros.</p>
            </details>
            <details>
              <summary>¿Necesito pagar para usar la página?</summary>
              <p>No, el acceso es gratuito.</p>
            </details>
            <details>
              <summary>¿Puedo descargar mis reportes financieros?</summary>
              <p>Sí, en formato PDF o Excel.</p>
            </details>
            <details>
              <summary>¿Qué categorías de gastos puedo registrar?</summary>
              <p>Alimentos, transporte, ocio, salud, vivienda, entre otros.</p>
            </details>
            <details>
              <summary>¿Funciona sin conexión a internet?</summary>
              <p>No, requiere conexión para sincronizar datos.</p>
            </details>
          </div>

          {/* Columna derecha con imagen */}
          <div className="faq-right">
            <img src="/FAQ.png" alt="Preguntas frecuentes" />
          </div>
        </div>
      </section>

      {/* FOOTER - Pie de página */}
      <footer>
        <div className="footer-container"> {/* Contenedor general del footer */}

          {/* LOGO Y DESCRIPCIÓN */}
          <div className="footer-logo">
            <img src="/pesito.png" alt="Pesito a Pesito" className="logo-img" />
            <p>
              Pesito a Pesito es una página web que te ayuda a tener el control de tus finanzas personales.
            </p>
            <p>@Company.com</p>
          </div>

          {/* INFORMACIÓN DE CONTACTO */}
          <div className="footer-info">
            <h4>Contáctanos</h4>
            <p>
              <span className="icon-circle">
                <FontAwesomeIcon icon={faClock} /> {/* Ícono de reloj */}
              </span>
              Lunes a viernes de 8:00 a 15:00 hrs.
            </p>
            <p>
              <span className="icon-circle">
                <FontAwesomeIcon icon={faPhone} /> {/* Ícono de teléfono */}
              </span>
              729-526-6453
            </p>
          </div>

          {/* REDES SOCIALES */}
          <div className="footer-redes">
            <h4>Redes Sociales</h4>
            <div className="icons">
              {/* Cada icono dentro de un círculo con estilo */}
              <a><span className="icon-circle"><FontAwesomeIcon icon={faFacebook} /></span></a>
              <a><span className="icon-circle"><FontAwesomeIcon icon={faTwitter} /></span></a>
              <a><span className="icon-circle"><FontAwesomeIcon icon={faInstagram} /></span></a>
              <a><span className="icon-circle"><FontAwesomeIcon icon={faYoutube} /></span></a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
