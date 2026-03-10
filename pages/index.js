import { useEffect, useMemo, useState } from "react";

const VEHICULOS_BASE = [
  {
    id: "f150",
    nombre: "Ford F-150",
    categoria: "Pickup",
    precio: "$1,189,900",
    descripcion:
      "Potencia, presencia y tecnología para trabajo, familia y carretera.",
    imagen: "/f-150.jpg",
    badge: "Más buscada",
    caracteristicas: [
      "Motor potente y gran desempeño",
      "Interior amplio y tecnológico",
      "Ideal para trabajo y uso diario",
    ],
    whatsappTexto:
      "Hola Diego, me interesa cotizar la Ford F-150. ¿Me das información?",
  },
  {
    id: "f250",
    nombre: "Ford F-250 Super Duty",
    categoria: "Trabajo pesado",
    precio: "$1,399,900",
    descripcion:
      "Capacidad real para carga, arrastre y trabajo duro en Parral y la región.",
    imagen: "/f-250.jpg",
    badge: "Trabajo pesado",
    caracteristicas: [
      "Gran capacidad de carga",
      "Excelente para negocio y trabajo rudo",
      "Fuerza y durabilidad Ford",
    ],
    whatsappTexto:
      "Hola Diego, me interesa la Ford F-250 Super Duty. ¿Me compartes información y disponibilidad?",
  },
  {
    id: "f350",
    nombre: "Ford F-350 Super Duty",
    categoria: "Uso rudo",
    precio: "$1,579,900",
    descripcion:
      "La solución para quienes necesitan máxima fuerza, resistencia y capacidad.",
    imagen: "/f-350.jpg",
    badge: "Máxima capacidad",
    caracteristicas: [
      "Mayor capacidad para remolque",
      "Pensada para trabajo intenso",
      "Seguridad y robustez superior",
    ],
    whatsappTexto:
      "Hola Diego, quiero información de la Ford F-350 Super Duty. ¿Me ayudas con una cotización?",
  },
  {
    id: "lobo",
    nombre: "Ford Lobo",
    categoria: "Pickup premium",
    precio: "$1,329,900",
    descripcion:
      "Lujo, potencia y presencia para quien busca una pickup con nivel premium.",
    imagen: "/lobo.jpg",
    badge: "Premium",
    caracteristicas: [
      "Diseño imponente",
      "Confort y tecnología avanzada",
      "Gran opción para ejecutivos y familia",
    ],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Lobo. ¿Me puedes enviar versiones y precio?",
  },
  {
    id: "edge",
    nombre: "Ford Edge",
    categoria: "SUV",
    precio: "$999,900",
    descripcion:
      "SUV elegante, espaciosa y tecnológica para quien busca confort y presencia.",
    imagen: "/edge.jpg",
    badge: "SUV premium",
    caracteristicas: [
      "Diseño moderno y atractivo",
      "Interior cómodo y amplio",
      "Ideal para familia y ciudad",
    ],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Edge. ¿Me compartes precio y más información?",
  },
  {
    id: "transit",
    nombre: "Ford Transit",
    categoria: "Van comercial",
    precio: "$1,149,900",
    descripcion:
      "La van ideal para carga, personal o negocio con gran capacidad y versatilidad.",
    imagen: "/transit.jpg",
    badge: "Negocio",
    caracteristicas: [
      "Excelente para negocio o flotilla",
      "Gran espacio y versatilidad",
      "Capacidad para trabajo diario",
    ],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit. ¿Me puedes compartir opciones y precio?",
  },
];

const DATOS_NEGOCIO_BASE = {
  asesorNombre: "Diego Valenzuela",
  telefono: "6272850550",
  ciudad: "Hidalgo del Parral, Chihuahua",
  slogan: "Asesor profesional en vehículos Ford",
  heroTitulo: "Encuentra tu próxima Ford con atención profesional y directa",
  heroTexto:
    "Te ayudo a elegir la unidad ideal para trabajo, familia o negocio. Atención rápida por WhatsApp, cotización personalizada y seguimiento profesional en Parral y alrededores.",
  beneficios: [
    "Atención personalizada",
    "Seguimiento rápido",
    "Apoyo en cotización",
    "Unidades para trabajo y familia",
  ],
};

function cargarDatos() {
  if (typeof window === "undefined") {
    return {
      vehiculos: VEHICULOS_BASE,
      negocio: DATOS_NEGOCIO_BASE,
    };
  }

  try {
    const vehiculosGuardados = localStorage.getItem("fordAppVehiculos");
    const negocioGuardado = localStorage.getItem("fordAppNegocio");

    return {
      vehiculos: vehiculosGuardados
        ? JSON.parse(vehiculosGuardados)
        : VEHICULOS_BASE,
      negocio: negocioGuardado
        ? JSON.parse(negocioGuardado)
        : DATOS_NEGOCIO_BASE,
    };
  } catch (error) {
    return {
      vehiculos: VEHICULOS_BASE,
      negocio: DATOS_NEGOCIO_BASE,
    };
  }
}

function formatearWhatsApp(numero, texto) {
  const limpio = String(numero).replace(/\D/g, "");
  return `https://wa.me/52${limpio}?text=${encodeURIComponent(texto)}`;
}

export default function Home() {
  const [vehiculos, setVehiculos] = useState(VEHICULOS_BASE);
  const [negocio, setNegocio] = useState(DATOS_NEGOCIO_BASE);
  const [filtro, setFiltro] = useState("Todos");

  useEffect(() => {
    const datos = cargarDatos();
    setVehiculos(datos.vehiculos);
    setNegocio(datos.negocio);

    const sincronizar = () => {
      const nuevosDatos = cargarDatos();
      setVehiculos(nuevosDatos.vehiculos);
      setNegocio(nuevosDatos.negocio);
    };

    window.addEventListener("storage", sincronizar);
    window.addEventListener("focus", sincronizar);

    return () => {
      window.removeEventListener("storage", sincronizar);
      window.removeEventListener("focus", sincronizar);
    };
  }, []);

  const categorias = useMemo(() => {
    const unicas = Array.from(new Set(vehiculos.map((v) => v.categoria)));
    return ["Todos", ...unicas];
  }, [vehiculos]);

  const vehiculosFiltrados = useMemo(() => {
    if (filtro === "Todos") return vehiculos;
    return vehiculos.filter((v) => v.categoria === filtro);
  }, [vehiculos, filtro]);

  const linkWhatsappGeneral = formatearWhatsApp(
    negocio.telefono,
    `Hola ${negocio.asesorNombre}, vi tu página y quiero información sobre vehículos Ford.`
  );

  return (
    <>
      <div className="app">
        <header className="topbar">
          <div className="container topbarInner">
            <div className="brand">
              <div className="logo">F</div>
              <div>
                <p className="brandMini">Ford App Parral</p>
                <h1>{negocio.asesorNombre}</h1>
              </div>
            </div>

            <nav className="nav">
              <a href="#inventario">Inventario</a>
              <a href="#asesor">Asesor</a>
              <a href="#contacto">Contacto</a>
              <a href="/admin" className="adminLink">
                Admin
              </a>
            </nav>
          </div>
        </header>

        <section className="hero">
          <div className="container heroGrid">
            <div className="heroText">
              <span className="eyebrow">Asesoría profesional Ford en Parral</span>
              <h2>{negocio.heroTitulo}</h2>
              <p>{negocio.heroTexto}</p>

              <div className="heroButtons">
                <a
                  href={linkWhatsappGeneral}
                  target="_blank"
                  rel="noreferrer"
                  className="btnPrimary"
                >
                  Cotizar por WhatsApp
                </a>
                <a href="#inventario" className="btnSecondary">
                  Ver inventario
                </a>
              </div>

              <div className="beneficios">
                {negocio.beneficios.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            </div>

            <div className="heroCard">
              <img
                src="/diego-asesor.jpg"
                alt={negocio.asesorNombre}
                className="asesorHeroImg"
              />
              <div className="heroCardInfo">
                <p className="miniLabel">Asesor</p>
                <h3>{negocio.asesorNombre}</h3>
                <p>{negocio.slogan}</p>
                <p>{negocio.ciudad}</p>

                <a
                  href={linkWhatsappGeneral}
                  target="_blank"
                  rel="noreferrer"
                  className="btnPrimary full"
                >
                  Hablar ahora
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container statsGrid">
            <div className="statCard">
              <strong>Atención rápida</strong>
              <span>Respuesta directa por WhatsApp</span>
            </div>
            <div className="statCard">
              <strong>Cotización personalizada</strong>
              <span>Cada cliente recibe atención según su perfil</span>
            </div>
            <div className="statCard">
              <strong>Opciones reales</strong>
              <span>Unidades para trabajo, familia y negocio</span>
            </div>
          </div>
        </section>

        <section id="inventario" className="inventario">
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">Inventario destacado</span>
                <h2>Unidades Ford disponibles para cotización</h2>
                <p>
                  Explora pickups, SUV y vehículos de trabajo. Los precios se
                  muestran de forma directa y la propuesta final puede variar
                  según versión, disponibilidad y perfil de compra.
                </p>
              </div>

              <div className="filtros">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    className={filtro === cat ? "filtro active" : "filtro"}
                    onClick={() => setFiltro(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="gridVehiculos">
              {vehiculosFiltrados.map((vehiculo) => (
                <article key={vehiculo.id} className="cardVehiculo">
                  <div className="imgWrap">
                    <img src={vehiculo.imagen} alt={vehiculo.nombre} />
                    <span className="badge">{vehiculo.badge}</span>
                  </div>

                  <div className="cardContent">
                    <p className="categoria">{vehiculo.categoria}</p>
                    <h3>{vehiculo.nombre}</h3>
                    <p className="descripcion">{vehiculo.descripcion}</p>

                    <div className="precioBox">
                      <div>
                        <span className="label">Precio desde</span>
                        <strong>{vehiculo.precio}</strong>
                      </div>
                    </div>

                    <ul className="features">
                      {vehiculo.caracteristicas.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <div className="acciones">
                      <a
                        href={formatearWhatsApp(
                          negocio.telefono,
                          vehiculo.whatsappTexto
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="btnPrimary"
                      >
                        Solicitar información
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ventajas">
          <div className="container ventajasGrid">
            <div className="ventajaCard">
              <h3>Atención directa</h3>
              <p>
                El cliente habla contigo de forma inmediata y eso genera más
                confianza desde el primer contacto.
              </p>
            </div>
            <div className="ventajaCard">
              <h3>Imagen profesional</h3>
              <p>
                La página transmite presencia, orden y seriedad para apoyar el
                cierre de ventas.
              </p>
            </div>
            <div className="ventajaCard">
              <h3>Enfoque comercial</h3>
              <p>
                Cada unidad tiene mensaje directo a WhatsApp para facilitar la
                prospección y la conversión.
              </p>
            </div>
          </div>
        </section>

        <section id="asesor" className="asesorSection">
          <div className="container asesorGrid">
            <div className="asesorFotoBox">
              <img
                src="/diego-asesor.jpg"
                alt={`Asesor ${negocio.asesorNombre}`}
                className="asesorFoto"
              />
            </div>

            <div className="asesorInfo">
              <span className="eyebrow">Tu asesor</span>
              <h2>{negocio.asesorNombre}</h2>
              <p className="asesorSub">{negocio.slogan}</p>
              <p>
                Atención enfocada en ayudarte a tomar una decisión clara, rápida
                y confiable. Ya sea una pickup para trabajo, una SUV o una van
                para negocio, te acompaño en todo el proceso.
              </p>

              <div className="asesorPuntos">
                <div className="point">Seguimiento personalizado</div>
                <div className="point">Atención por WhatsApp</div>
                <div className="point">Cotizaciones claras</div>
                <div className="point">Enfoque profesional</div>
              </div>

              <a
                href={linkWhatsappGeneral}
                target="_blank"
                rel="noreferrer"
                className="btnPrimary"
              >
                Contactar a {negocio.asesorNombre}
              </a>
            </div>
          </div>
        </section>

        <section id="contacto" className="contacto">
          <div className="container contactoBox">
            <div>
              <span className="eyebrow">Contacto</span>
              <h2>¿Listo para cotizar tu próxima Ford?</h2>
              <p>
                Escríbeme y te ayudo a revisar opciones, versiones, precio y la
                unidad ideal según tu necesidad.
              </p>
            </div>

            <div className="contactActions">
              <a
                href={linkWhatsappGeneral}
                target="_blank"
                rel="noreferrer"
                className="btnPrimary"
              >
                WhatsApp: {negocio.telefono}
              </a>
              <a href="/admin" className="btnSecondary">
                Ir al panel admin
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footerInner">
            <div>
              <strong>{negocio.asesorNombre}</strong>
              <p>{negocio.slogan}</p>
            </div>

            <div className="footerLinks">
              <a href="#inventario">Inventario</a>
              <a href="#asesor">Asesor</a>
              <a href="/admin">Admin</a>
            </div>
          </div>
        </footer>

        <a
          href={linkWhatsappGeneral}
          target="_blank"
          rel="noreferrer"
          className="whatsappFloat"
          aria-label="WhatsApp"
        >
          WA
        </a>
      </div>

      <style jsx>{`
        :global(html) {
          scroll-behavior: smooth;
        }

        :global(body) {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #07111f;
          color: #ffffff;
        }

        :global(*) {
          box-sizing: border-box;
        }

        :global(a) {
          text-decoration: none;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(0, 118, 255, 0.22), transparent 30%),
            linear-gradient(180deg, #07111f 0%, #0c1a2d 40%, #07111f 100%);
        }

        .container {
          width: min(1200px, calc(100% - 32px));
          margin: 0 auto;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
          background: rgba(7, 17, 31, 0.82);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .topbarInner {
          min-height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .logo {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          font-size: 22px;
          font-weight: 800;
          background: linear-gradient(135deg, #1570ef, #3ea6ff);
          box-shadow: 0 12px 30px rgba(21, 112, 239, 0.35);
        }

        .brandMini {
          margin: 0 0 4px;
          color: #7fc0ff;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .brand h1 {
          margin: 0;
          font-size: 20px;
        }

        .nav {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .nav a {
          color: #d8e6f7;
          font-size: 14px;
        }

        .adminLink {
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
        }

        .hero {
          padding: 56px 0 36px;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 28px;
          align-items: center;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          color: #7fc0ff;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .heroText h2 {
          margin: 0 0 14px;
          font-size: clamp(32px, 5vw, 56px);
          line-height: 1.05;
        }

        .heroText p {
          margin: 0;
          color: #dbe9f8;
          line-height: 1.7;
          font-size: 17px;
        }

        .heroButtons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .btnPrimary,
        .btnSecondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 18px;
          border-radius: 14px;
          font-weight: 700;
          transition: 0.25s ease;
        }

        .btnPrimary {
          color: #fff;
          background: linear-gradient(135deg, #1570ef, #3ea6ff);
          box-shadow: 0 14px 35px rgba(21, 112, 239, 0.28);
        }

        .btnPrimary:hover {
          transform: translateY(-2px);
        }

        .btnSecondary {
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.03);
        }

        .beneficios {
          margin-top: 22px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .beneficios span {
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 13px;
          color: #dbe9f8;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .heroCard {
          overflow: hidden;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }

        .asesorHeroImg {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
        }

        .heroCardInfo {
          padding: 22px;
        }

        .heroCardInfo h3 {
          margin: 0 0 8px;
          font-size: 26px;
        }

        .heroCardInfo p {
          color: #dbe9f8;
          margin: 0 0 8px;
        }

        .miniLabel {
          color: #7fc0ff !important;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 12px;
          font-weight: 700;
        }

        .full {
          width: 100%;
          margin-top: 12px;
        }

        .stats {
          padding: 12px 0 20px;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .statCard {
          padding: 22px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .statCard strong {
          display: block;
          margin-bottom: 8px;
          font-size: 18px;
        }

        .statCard span {
          color: #dbe9f8;
          line-height: 1.6;
        }

        .inventario {
          padding: 52px 0;
        }

        .sectionHead {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 24px;
        }

        .sectionHead h2 {
          margin: 0 0 10px;
          font-size: 34px;
        }

        .sectionHead p {
          margin: 0;
          color: #dbe9f8;
          max-width: 700px;
          line-height: 1.7;
        }

        .filtros {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filtro {
          border: none;
          cursor: pointer;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 999px;
          color: #fff;
          background: rgba(255, 255, 255, 0.07);
        }

        .filtro.active {
          background: linear-gradient(135deg, #1570ef, #3ea6ff);
        }

        .gridVehiculos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .cardVehiculo {
          overflow: hidden;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
        }

        .imgWrap {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: #081522;
        }

        .imgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .cardVehiculo:hover .imgWrap img {
          transform: scale(1.04);
        }

        .badge {
          position: absolute;
          top: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
        }

        .cardContent {
          padding: 22px;
        }

        .categoria {
          margin: 0 0 8px;
          color: #7fc0ff;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cardContent h3 {
          margin: 0 0 10px;
          font-size: 28px;
        }

        .descripcion {
          color: #dbe9f8;
          line-height: 1.7;
          margin: 0 0 18px;
        }

        .precioBox {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }

        .precioBox > div {
          padding: 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
        }

        .label {
          display: block;
          color: #95b7db;
          font-size: 12px;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .precioBox strong {
          font-size: 22px;
        }

        .features {
          margin: 0 0 22px;
          padding-left: 18px;
          color: #dbe9f8;
          line-height: 1.9;
        }

        .acciones {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ventajas {
          padding: 0 0 52px;
        }

        .ventajasGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .ventajaCard {
          padding: 22px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }

        .ventajaCard h3 {
          margin: 0 0 10px;
          font-size: 22px;
        }

        .ventajaCard p {
          margin: 0;
          color: #dbe9f8;
          line-height: 1.7;
        }

        .asesorSection {
          padding: 30px 0 52px;
        }

        .asesorGrid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 26px;
          align-items: center;
        }

        .asesorFotoBox {
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .asesorFoto {
          width: 100%;
          height: 100%;
          min-height: 420px;
          object-fit: cover;
          display: block;
        }

        .asesorInfo {
          padding: 10px 0;
        }

        .asesorInfo h2 {
          margin: 0 0 8px;
          font-size: 40px;
        }

        .asesorSub {
          color: #7fc0ff;
          font-weight: 700;
          margin: 0 0 14px;
        }

        .asesorInfo p {
          color: #dbe9f8;
          line-height: 1.8;
          font-size: 17px;
        }

        .asesorPuntos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 22px 0;
        }

        .point {
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .contacto {
          padding: 10px 0 60px;
        }

        .contactoBox {
          padding: 28px;
          border-radius: 26px;
          background: linear-gradient(135deg, rgba(21, 112, 239, 0.18), rgba(62, 166, 255, 0.08));
          border: 1px solid rgba(127, 192, 255, 0.16);
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
        }

        .contactoBox h2 {
          margin: 0 0 10px;
          font-size: 34px;
        }

        .contactoBox p {
          margin: 0;
          color: #dbe9f8;
          line-height: 1.7;
          max-width: 720px;
        }

        .contactActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 22px 0 28px;
        }

        .footerInner {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
        }

        .footerInner p {
          margin: 6px 0 0;
          color: #dbe9f8;
        }

        .footerLinks {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .footerLinks a {
          color: #dbe9f8;
        }

        .whatsappFloat {
          position: fixed;
          right: 18px;
          bottom: 18px;
          width: 62px;
          height: 62px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #11b857, #36d97d);
          box-shadow: 0 18px 35px rgba(17, 184, 87, 0.35);
          z-index: 50;
        }

        @media (max-width: 980px) {
          .heroGrid,
          .asesorGrid,
          .gridVehiculos,
          .statsGrid,
          .ventajasGrid,
          .contactoBox {
            grid-template-columns: 1fr;
          }

          .sectionHead,
          .footerInner,
          .topbarInner {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav {
            width: 100%;
          }

          .contactoBox {
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding-top: 34px;
          }

          .heroText h2,
          .asesorInfo h2,
          .sectionHead h2,
          .contactoBox h2 {
            font-size: 30px;
          }

          .imgWrap {
            height: 220px;
          }

          .asesorPuntos {
            grid-template-columns: 1fr;
          }

          .asesorHeroImg {
            height: 280px;
          }

          .asesorFoto {
            min-height: 300px;
          }
        }
      `}</style>
    </>
  );
}
