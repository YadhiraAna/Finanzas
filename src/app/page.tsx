export default function Home() {
  return (
    <>
      <header className="site-header">
        <nav className="nav">
          <div className="brand">
            <img src="/pesito.png" alt="Pesito a Pesito" className="logo-img" />
          </div>
          <div className="menu">
            <button className="btn">Iniciar Sesión</button>
            <button className="btn">Registrarse</button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <main className="container section hero">
        <div className="hero-text">
          <h1>
            Construye grandes metas <br /> con pequeños pasos
          </h1>
          <p>
            Administra tus gastos, ahorra más y alcanza tus metas financieras con
            facilidad.
          </p>
          <a href="#" className="btn-main">
            Comienza ahora
          </a>
        </div>
        <div className="hero-img">
          <img src="/imgLoading.png" alt="Finanzas" />
        </div>
      </main>

      {/* SABÍAS QUE */}
      <section className="sabias">
        <h2>¿SABÍAS QUE?</h2>
        <div className="sabias-grid">
          <div className="sabias-item">
            <p>
              Usuarios que emplean sistemas de finanzas personales ahorran en
              promedio <strong> 10–20% más </strong> al mes que los que no los
              utilizan según Steven Burnett.
            </p>
          </div>
          <div className="sabias-item">
            <p>
              El simple hábito de anotar tus gastos diarios puede ayudarte a
              detectar hasta <strong> 30 fugas de dinero </strong> al mes.
            </p>
          </div>
          <div className="sabias-item">
            <p>
              El estrés financiero es una de las principales causas de insomnio
              en adultos. Organizar tus finanzas puede mejorar incluso tu salud.
            </p>
          </div>
          <div className="sabias-item">
            <p>
              Tener metas financieras claras aumenta la probabilidad de
              alcanzarlas <strong> hasta 10 veces más </strong> que cuando no se
              planifican.
            </p>
          </div>
        </div>
      </section>

      {/* FUNCIONES */}
      <section className="funciones">
        <h2>Funciones</h2>
        <div className="funciones-grid">
          <div className="funcion">
            <img src="/f1.png" alt="Organiza tus finanzas" />
            <h3>Organiza tus finanzas</h3>
            <p>
              Registra tus ingresos y gastos diarios para tener el control de tu
              dinero en un solo lugar.
            </p>
          </div>
          <div className="funcion">
            <img src="/f2.png" alt="Presupuestos personalizados" />
            <h3>Presupuestos personalizados</h3>
            <p>
              Define un límite de gasto y recibe alertas cuando estés por
              superarlo.
            </p>
          </div>
          <div className="funcion">
            <img src="/f3.png" alt="Visualización de datos financieros" />
            <h3>Visualización de datos financieros</h3>
            <p>
              Visualiza en gráficas cuánto gastas y en qué categoría, para
              entender mejor tus hábitos.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonios">
        <h2>Lo que dicen nuestros usuarios</h2>
        <p>
          Historias reales de personas que mejoraron sus finanzas con Pesito a
          Pesito
        </p>
        <div className="cards">
          <div className="card">
            <h4>Alejandro Corona</h4>
            <p>⭐ 4.5</p>
            <p>
              {' '}
              La interfaz es muy intuitiva y me permite llevar un control
              detallado de mis gastos e ingresos.{' '}
            </p>
          </div>
          <div className="card">
            <h4>Marisol Martínez</h4>
            <p>⭐ 4.0</p>
            <p>
              {' '}
              La herramienta es útil y me ha ayudado a organizar mis finanzas e
              integrar la sincronización bancaria.{' '}
            </p>
          </div>
          <div className="card">
            <h4>Emilia Sánchez</h4>
            <p>⭐ 4.5</p>
            <p>
              {' '}
              El seguimiento de gastos me ayudó a ahorrar para mis vacaciones. Es
              muy fácil de usar.{' '}
            </p>
          </div>
        </div>
        {/* Botones de carrusel */}
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
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Preguntas frecuentes</h2>
        <div className="faq-container">
          <div className="faq-left">
            <details open>
              <summary>¿Qué puedo hacer en esta página?</summary>
              <p>
                Puedes registrar tus ingresos y gastos, visualizar gráficas,
                establecer presupuestos y recibir consejos financieros.
              </p>
            </details>
            <details>
              <summary>¿Necesito pagar para usar la página?</summary>
              <p>No, el acceso es totalmente gratuito.</p>
            </details>
            <details>
              <summary>¿Puedo descargar mis reportes financieros?</summary>
              <p>Sí, puedes exportar tus reportes en formato PDF o Excel.</p>
            </details>
            <details>
              <summary>¿Qué categorías de gastos puedo registrar?</summary>
              <p>
                Puedes registrar alimentos, transporte, ocio, salud, vivienda,
                entre otros.
              </p>
            </details>
            <details>
              <summary>¿La página funciona sin conexión a internet?</summary>
              <p>No, necesitas conexión para sincronizar tus datos.</p>
            </details>
          </div>
          <div className="faq-right">
            <img src="/FAQ.png" alt="Preguntas frecuentes" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/pesito.png" alt="Pesito a Pesito" className="logo-img" />
            <p>
              Pesito a Pesito es una página web que te ayuda a tener el control
              de tus finanzas personales.
            </p>
            <p>@Company.com</p>
          </div>
          <div className="footer-info">
            <h4>Contáctanos</h4>
            <p>Lunes a viernes de 8:00 a 15:00 hrs.</p>
            <p>729-526-6453</p>
          </div>
          <div className="footer-redes">
            <h4>Redes Sociales</h4>
            <div className="icons">
              <a>
                <span>🌐</span>
              </a>
              <a>
                <span>📘</span>
              </a>
              <a>
                <span>🐦</span>
              </a>
              <a>
                <span>📷</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}