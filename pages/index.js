import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "526272850550";

const catalogo = [
  {
    id: 1,
    categoria: "SUV",
    nombre: "Ford Territory 2026",
    corto: "Territory",
    precioBase: "$559,900",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/territory/2025/overview/ford-territory-2025-suv-blanco.jpg",
    etiqueta: "Ideal para familia",
    frase:
      "La SUV que proyecta seguridad, tecnología y presencia desde la primera vista.",
    gancho:
      "Más espacio, mejor imagen y tecnología que sí se nota en cada trayecto.",
    resumen:
      "Perfecta para familias y profesionistas que buscan una SUV moderna, amplia y con gran equipamiento.",
    colorEtiqueta: "#dbeafe",
    colorTextoEtiqueta: "#1d4ed8",
    ficha: [
      "Motor 1.8L Turbo EcoBoost I4",
      "187 HP",
      "236 lb-pie de torque",
      "Transmisión automática de 7 velocidades",
      "Pantalla táctil de 12 pulgadas",
      "Clúster digital de 12 pulgadas",
      "4 modos de manejo",
      "Diseño moderno con gran presencia"
    ],
    versiones: [
      { nombre: "Ambiente", precio: "$559,900" },
      { nombre: "Trend", precio: "Consulta disponibilidad" },
      { nombre: "Titanium", precio: "Consulta disponibilidad" }
    ]
  },
  {
    id: 2,
    categoria: "Pickup",
    nombre: "Ford Ranger 2026",
    corto: "Ranger",
    precioBase: "$763,500",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/ranger/2024/overview/ranger-2024.jpg",
    etiqueta: "Muy vendida",
    frase:
      "La pickup que trabaja duro entre semana y luce fuerte todos los días.",
    gancho:
      "Potencia, versatilidad y presencia para campo, ciudad y negocio.",
    resumen:
      "Una pickup equilibrada para quien necesita rendimiento, imagen y practicidad en el día a día.",
    colorEtiqueta: "#dcfce7",
    colorTextoEtiqueta: "#166534",
    ficha: [
      "Motor 2.3L EcoBoost disponible",
      "270 HP",
      "310 lb-pie de torque",
      "Versiones 4x2 y 4x4",
      "Excelente para trabajo y uso diario",
      "Diseño robusto y moderno",
      "Buena altura y presencia comercial",
      "Ideal para Parral y la región"
    ],
    versiones: [
      { nombre: "XL", precio: "$763,500" },
      { nombre: "XLT", precio: "Consulta precio" },
      { nombre: "Lariat", precio: "Consulta precio" }
    ]
  },
  {
    id: 3,
    categoria: "Pickup Performance",
    nombre: "Ford Ranger Raptor 2026",
    corto: "Ranger Raptor",
    precioBase: "$1,313,500",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/ranger-raptor/2024/overview/ranger-raptor.jpg",
    etiqueta: "Imagen agresiva",
    frase:
      "No es solo una pickup, es una declaración de poder y presencia.",
    gancho:
      "Impacta, acelera y domina cualquier terreno con una imagen brutal.",
    resumen:
      "Para clientes que quieren una pickup aspiracional, agresiva y con muchísima presencia.",
    colorEtiqueta: "#fee2e2",
    colorTextoEtiqueta: "#b91c1c",
    ficha: [
      "Motor 3.0L V6 Twin Turbo",
      "392 HP",
      "430 lb-pie de torque",
      "Transmisión automática de 10 velocidades",
      "Modos de manejo avanzados",
      "Desempeño off-road de alto nivel",
      "Diseño extremo y deportivo",
      "Ideal para clientes de alto impacto"
    ],
    versiones: [{ nombre: "Raptor", precio: "$1,313,500" }]
  },
  {
    id: 4,
    categoria: "Pickup",
    nombre: "Ford Maverick 2025",
    corto: "Maverick",
    precioBase: "$737,100",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/maverick/2024/overview/maverick.jpg",
    etiqueta: "Excelente ciudad",
    frase:
      "La pickup inteligente para emprender, moverte diario y vender mejor tu imagen.",
    gancho:
      "Compacta por fuera, muy útil por dentro y con perfil ganador.",
    resumen:
      "Ideal para emprendedores, uso diario y quien quiere una pickup cómoda sin irse a un tamaño grande.",
    colorEtiqueta: "#fef3c7",
    colorTextoEtiqueta: "#92400e",
    ficha: [
      "Versiones gasolina e híbrida",
      "Muy práctica para uso diario",
      "Diseño moderno y funcional",
      "Excelente para ciudad",
      "Caja útil para trabajo ligero",
      "Buena imagen comercial",
      "Muy atractiva para clientes jóvenes",
      "Enfoque urbano y emprendedor"
    ],
    versiones: [
      { nombre: "XLT", precio: "$737,100" },
      { nombre: "Lariat", precio: "Consulta precio" }
    ]
  },
  {
    id: 5,
    categoria: "SUV",
    nombre: "Ford Bronco Sport 2026",
    corto: "Bronco Sport",
    precioBase: "$773,500",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/bronco-sport/2024/overview/bronco-sport.jpg",
    etiqueta: "Estilo aventurero",
    frase:
      "Diseñada para quien no quiere pasar desapercibido ni en ciudad ni en aventura.",
    gancho:
      "Aventura, estilo y carácter en una sola SUV.",
    resumen:
      "Una SUV con personalidad fuerte, pensada para clientes que quieren imagen y versatilidad.",
    colorEtiqueta: "#ede9fe",
    colorTextoEtiqueta: "#6d28d9",
    ficha: [
      "Motor 1.5L EcoBoost",
      "181 HP",
      "Versiones superiores con mayor capacidad",
      "Perfil aventurero",
      "Excelente imagen",
      "Diseño distintivo",
      "Ideal para clientes que buscan estilo",
      "Buena opción aspiracional"
    ],
    versiones: [
      { nombre: "Big Bend", precio: "$773,500" },
      { nombre: "Outer Banks", precio: "Consulta precio" },
      { nombre: "Badlands", precio: "Consulta precio" }
    ]
  },
  {
    id: 6,
    categoria: "Deportivo",
    nombre: "Ford Mustang 2026",
    corto: "Mustang",
    precioBase: "$951,500",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/mustang/2024/overview/mustang.jpg",
    etiqueta: "Aspiracional",
    frase:
      "No todos compran un auto; algunos compran una forma de destacar.",
    gancho:
      "Pasión, sonido y presencia que cierran miradas desde el primer segundo.",
    resumen:
      "Para clientes que buscan un auto con imagen, emoción y un perfil totalmente aspiracional.",
    colorEtiqueta: "#fde68a",
    colorTextoEtiqueta: "#92400e",
    ficha: [
      "Motor EcoBoost disponible",
      "Versión GT disponible",
      "Perfil deportivo icónico",
      "Gran presencia visual",
      "Interior orientado al manejo",
      "Auto aspiracional de alto impacto",
      "Ideal para generar deseo de compra",
      "Uno de los modelos más emocionales"
    ],
    versiones: [
      { nombre: "EcoBoost", precio: "$951,500" },
      { nombre: "GT", precio: "Consulta precio" }
    ]
  },
  {
    id: 7,
    categoria: "Pickup",
    nombre: "Ford F-150 2025",
    corto: "F-150",
    precioBase: "$1,008,100",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/f150/2024/overview/f150.jpg",
    etiqueta: "Trabajo pesado",
    frase:
      "Cuando el trabajo exige resultados, F-150 responde con fuerza real.",
    gancho:
      "Capacidad, imagen y respaldo para quien no puede darse el lujo de fallar.",
    resumen:
      "La pickup ideal para clientes que buscan una unidad de trabajo con gran reputación y presencia.",
    colorEtiqueta: "#d1fae5",
    colorTextoEtiqueta: "#065f46",
    ficha: [
      "Pickup de trabajo de gran reconocimiento",
      "Excelente capacidad y respaldo",
      "Versiones para distintos perfiles",
      "Muy buena imagen comercial",
      "Cabina cómoda y robusta",
      "Ideal para negocio y campo",
      "Muy atractiva para empresas y particulares",
      "Gran nivel de confianza en el mercado"
    ],
    versiones: [
      { nombre: "XL", precio: "$1,008,100" },
      { nombre: "XLT", precio: "Consulta precio" }
    ]
  },
  {
    id: 8,
    categoria: "Pickup Premium",
    nombre: "Ford Lobo 2025",
    corto: "Lobo",
    precioBase: "$1,417,100",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/lobo/2024/overview/lobo.jpg",
    etiqueta: "Premium",
    frase:
      "Una pickup premium que impone respeto antes de arrancar.",
    gancho:
      "Lujo, fuerza y estatus en una sola unidad.",
    resumen:
      "Perfecta para clientes que quieren una pickup premium, elegante y con muchísimo porte.",
    colorEtiqueta: "#fce7f3",
    colorTextoEtiqueta: "#9d174d",
    ficha: [
      "Pickup premium",
      "Alto nivel de confort",
      "Gran presencia exterior",
      "Muy atractiva para clientes ejecutivos",
      "Excelente imagen en ciudad y carretera",
      "Ideal para quien busca lujo y fuerza",
      "Interior superior",
      "Perfil comercial de alto ticket"
    ],
    versiones: [
      { nombre: "Lariat", precio: "$1,428,100" },
      { nombre: "Platinum", precio: "Consulta precio" }
    ]
  },
  {
    id: 9,
    categoria: "Camión",
    nombre: "Ford F-250 Super Duty 2026",
    corto: "F-250",
    precioBase: "$1,560,800",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/super-duty/2024/overview/f250.jpg",
    etiqueta: "Muy fuerte",
    frase:
      "Si el trabajo es pesado, necesitas una unidad que lo soporte de verdad.",
    gancho:
      "Capacidad bruta, presencia fuerte y respaldo para jale serio.",
    resumen:
      "Muy buscada para trabajo pesado, campo y clientes que necesitan una unidad realmente fuerte.",
    colorEtiqueta: "#e0f2fe",
    colorTextoEtiqueta: "#0c4a6e",
    ficha: [
      "Enfoque de trabajo pesado",
      "Gran capacidad de carga y arrastre",
      "Excelente presencia física",
      "Ideal para campo e industria",
      "Muy atractiva en la región",
      "Buena opción para flotillas",
      "Perfil fuerte y robusto",
      "Unidad para clientes exigentes"
    ],
    versiones: [
      { nombre: "XLT", precio: "$1,560,800" },
      { nombre: "King Ranch", precio: "Consulta precio" }
    ]
  },
  {
    id: 10,
    categoria: "Camión",
    nombre: "Ford F-350 2026",
    corto: "F-350",
    precioBase: "$1,081,600",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/super-duty/2024/overview/f350.jpg",
    etiqueta: "Negocio y carga",
    frase:
      "Para carrozar, cargar y producir: una base de trabajo que sí deja dinero.",
    gancho:
      "El aliado ideal para negocio, carga y trabajo rudo en la región.",
    resumen:
      "Excelente opción para negocio, carrozado y operación comercial.",
    colorEtiqueta: "#ede9fe",
    colorTextoEtiqueta: "#5b21b6",
    ficha: [
      "Base ideal para carrozado",
      "Pensada para trabajo comercial",
      "Buena capacidad de carga",
      "Muy útil para negocio",
      "Gran aceptación en trabajo regional",
      "Ideal para operación diaria",
      "Fuerte, práctica y rendidora",
      "Pensada para producir"
    ],
    versiones: [
      { nombre: "XL", precio: "$1,081,600" },
      { nombre: "XL Plus", precio: "Consulta precio" }
    ]
  }
];

const ventajas = [
  {
    titulo: "Atención directa",
    texto: "Hablas conmigo de forma directa para resolver dudas, revisar versiones y avanzar a cotización."
  },
  {
    titulo: "Seguimiento real",
    texto: "Cada prospecto se registra para dar continuidad y no perder oportunidades."
  },
  {
    titulo: "Enfoque regional",
    texto: "La selección está pensada para lo que más se mueve en Parral y alrededores."
  }
];

function ImagenVehiculo({ src, alt }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        style={{
          width: "100%",
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e5e7eb, #cbd5e1)",
          color: "#1f2937",
          fontWeight: 800,
          fontSize: 28
        }}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      style={{
        width: "100%",
        height: 240,
        objectFit: "cover",
        display: "block"
      }}
    />
  );
}

function FotoAsesor() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          width: 290,
          height: 360,
          borderRadius: 26,
          background: "linear-gradient(135deg, #1f2937, #111827)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: 24,
          fontWeight: 700
        }}
      >
        Sube tu foto a public/diego-asesor.jpg
      </div>
    );
  }

  return (
    <img
      src="/diego-asesor.jpg"
      alt="Diego Valenzuela"
      onError={() => setError(true)}
      style={{
        width: 290,
        height: 360,
        borderRadius: 26,
        objectFit: "cover",
        display: "block",
        boxShadow: "0 16px 40px rgba(0,0,0,0.24)"
      }}
    />
  );
}

function VentajaCard({ titulo, texto }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        padding: 20,
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 24px rgba(0,0,0,0.05)"
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 22 }}>{titulo}</h3>
      <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.6 }}>{texto}</p>
    </div>
  );
}

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [comentario, setComentario] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [versionSeleccionada, setVersionSeleccionada] = useState({});

  const categorias = useMemo(
    () => ["Todos", ...new Set(catalogo.map((item) => item.categoria))],
    []
  );

  const vehiculosFiltrados = useMemo(() => {
    return catalogo.filter((item) => {
      const coincideCategoria =
        categoriaActiva === "Todos" || item.categoria === categoriaActiva;

      const textoBusqueda = [
        item.nombre,
        item.corto,
        item.categoria,
        item.frase,
        item.gancho,
        item.etiqueta
      ]
        .join(" ")
        .toLowerCase();

      const coincideTexto = textoBusqueda.includes(busqueda.toLowerCase());

      return coincideCategoria && coincideTexto;
    });
  }, [categoriaActiva, busqueda]);

  async function guardarProspecto({
    nombre,
    telefono,
    vehiculo,
    comentario = "",
    origen = "web"
  }) {
    const payload = {
      nombre: nombre || "Cliente Web",
      telefono: telefono || "Pendiente",
      vehiculo: vehiculo || "Vehículo no especificado",
      comentario: comentario || "",
      origen
    };

    const { error } = await supabase.from("prospectos").insert([payload]);

    if (error) {
      console.error("Error guardando prospecto:", error);
      alert("No se pudo guardar el prospecto");
      return false;
    }

    return true;
  }

  async function enviarFormulario() {
    if (!nombre || !telefono) {
      alert("Por favor llena nombre y teléfono");
      return;
    }

    const ok = await guardarProspecto({
      nombre,
      telefono,
      vehiculo,
      comentario,
      origen: "formulario"
    });

    if (ok) {
      alert("Solicitud enviada. Te contactaremos pronto.");
      setNombre("");
      setTelefono("");
      setVehiculo("");
      setComentario("");
    }
  }

  async function handleCotizar(item, version) {
    await guardarProspecto({
      nombre: "Cliente Web",
      telefono: "Pendiente",
      vehiculo: `${item.nombre} - ${version.nombre}`,
      comentario: "",
      origen: "whatsapp"
    });

    const mensaje = `Hola Diego, quiero cotización de ${item.nombre} versión ${version.nombre}. ¿Me apoyas con precio, promoción y opciones de financiamiento?`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  }

  function obtenerVersionActual(item) {
    const index = versionSeleccionada[item.id] ?? 0;
    return item.versiones[index];
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
        color: "#111827"
      }}
    >
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: 24 }}>
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(30,41,59,0.94))",
            color: "white",
            borderRadius: 34,
            padding: 30,
            marginBottom: 28,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 30%)"
            }}
          />

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1.25fr 0.75fr",
              gap: 28,
              alignItems: "center"
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.12)",
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 13,
                  marginBottom: 14,
                  fontWeight: 700
                }}
              >
                Catálogo Ford Parral
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 54,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em"
                }}
              >
                Diego Valenzuela
              </h1>

              <p style={{ marginTop: 10, fontSize: 29, fontWeight: 700 }}>
                Asesor Profesional Ford Parral
              </p>

              <p
                style={{
                  marginTop: 14,
                  fontSize: 18,
                  lineHeight: 1.65,
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.88)"
                }}
              >
                Pickups, SUVs, deportivos y camiones Ford con enfoque comercial,
                atención directa y cotización por WhatsApp según la versión que más te interese.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 18
                }}
              >
                <div style={heroBadge}>📲 WhatsApp: 6272850550</div>
                <div style={heroBadge}>📍 Parral y región</div>
                <div style={heroBadge}>🔒 Panel privado: /admin</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <FotoAsesor />
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 18,
            marginBottom: 28
          }}
        >
          {ventajas.map((item) => (
            <VentajaCard
              key={item.titulo}
              titulo={item.titulo}
              texto={item.texto}
            />
          ))}
        </section>

        <section
          style={{
            background: "white",
            borderRadius: 26,
            padding: 24,
            marginBottom: 30,
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)"
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 34 }}>
            Solicitar información
          </h2>
          <p style={{ marginTop: 0, color: "#4b5563", fontSize: 16 }}>
            Déjame tus datos y te contacto con opción, promoción y disponibilidad.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 14
            }}
          >
            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Vehículo de interés"
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
              style={inputStyle}
            />
          </div>

          <textarea
            placeholder="Comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: 110,
              marginTop: 14,
              resize: "vertical"
            }}
          />

          <button onClick={enviarFormulario} style={primaryButton}>
            Enviar solicitud
          </button>
        </section>

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ marginBottom: 8, fontSize: 34 }}>Explora el catálogo</h2>
          <p style={{ marginTop: 0, color: "#4b5563", fontSize: 16 }}>
            Busca el vehículo ideal, elige la versión y solicita cotización directa.
          </p>

          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <input
              placeholder="Buscar vehículo, categoría o palabra clave..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                style={{
                  ...chipButton,
                  background: categoriaActiva === cat ? "#111827" : "white",
                  color: categoriaActiva === cat ? "white" : "#111827",
                  border:
                    categoriaActiva === cat
                      ? "1px solid #111827"
                      : "1px solid #d1d5db"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: 20
          }}
        >
          {vehiculosFiltrados.map((item) => {
            const expanded = expandedId === item.id;
            const versionActual = obtenerVersionActual(item);

            return (
              <article
                key={item.id}
                style={{
                  background: "white",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.07)"
                }}
              >
                <ImagenVehiculo src={item.imagen} alt={item.corto} />

                <div style={{ padding: 22 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "flex-start"
                    }}
                  >
                    <div>
                      <div style={typeBadge}>{item.categoria}</div>
                      <h3
                        style={{
                          margin: "12px 0 6px 0",
                          fontSize: 31,
                          lineHeight: 1.04
                        }}
                      >
                        {item.corto}
                      </h3>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>Desde</div>
                      <div style={{ fontSize: 28, fontWeight: 800 }}>
                        {item.precioBase}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      marginTop: 6,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: item.colorEtiqueta,
                      color: item.colorTextoEtiqueta,
                      fontSize: 12,
                      fontWeight: 800
                    }}
                  >
                    {item.etiqueta}
                  </div>

                  <p
                    style={{
                      margin: "14px 0 10px 0",
                      fontSize: 20,
                      fontWeight: 800,
                      lineHeight: 1.35
                    }}
                  >
                    {item.frase}
                  </p>

                  <p
                    style={{
                      marginTop: 0,
                      marginBottom: 10,
                      color: "#4b5563",
                      lineHeight: 1.6
                    }}
                  >
                    {item.gancho}
                  </p>

                  <p
                    style={{
                      marginTop: 0,
                      color: "#6b7280",
                      lineHeight: 1.6,
                      fontSize: 14
                    }}
                  >
                    {item.resumen}
                  </p>

                  <div
                    style={{
                      marginTop: 16,
                      padding: 14,
                      background: "#f9fafb",
                      borderRadius: 16,
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        marginBottom: 8,
                        fontWeight: 700
                      }}
                    >
                      Selecciona versión
                    </div>

                    <select
                      value={versionSeleccionada[item.id] ?? 0}
                      onChange={(e) =>
                        setVersionSeleccionada((prev) => ({
                          ...prev,
                          [item.id]: Number(e.target.value)
                        }))
                      }
                      style={selectStyle}
                    >
                      {item.versiones.map((ver, idx) => (
                        <option key={ver.nombre} value={idx}>
                          {ver.nombre} — {ver.precio}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginTop: 16
                    }}
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expanded ? null : item.id)
                      }
                      style={secondaryButton}
                    >
                      {expanded ? "Ocultar ficha" : "Ver ficha técnica"}
                    </button>

                    <button
                      onClick={() => handleCotizar(item, versionActual)}
                      style={whatsButton}
                    >
                      Pedir cotización
                    </button>
                  </div>

                  {expanded && (
                    <div
                      style={{
                        marginTop: 16,
                        padding: 16,
                        background: "#f9fafb",
                        borderRadius: 16,
                        border: "1px solid #e5e7eb"
                      }}
                    >
                      <h4 style={{ margin: "0 0 12px 0", fontSize: 20 }}>
                        Ficha técnica rápida
                      </h4>

                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: 20,
                          lineHeight: 1.8,
                          color: "#374151"
                        }}
                      >
                        {item.ficha.map((dato, idx) => (
                          <li key={idx}>{dato}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section
          style={{
            marginTop: 34,
            background: "white",
            borderRadius: 28,
            padding: 28,
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)"
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 10, fontSize: 34 }}>
            ¿Buscas una Ford para trabajo, familia o imagen?
          </h2>
          <p
            style={{
              marginTop: 0,
              color: "#4b5563",
              fontSize: 17,
              lineHeight: 1.7,
              maxWidth: 900
            }}
          >
            Te ayudo a encontrar la versión correcta según tu perfil, necesidades
            y tipo de uso. Escríbeme y revisamos la mejor opción para ti.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    "Hola Diego, quiero asesoría para elegir una Ford."
                  )}`,
                  "_blank"
                );
              }}
              style={primaryButton}
            >
              Quiero asesoría
            </button>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={secondaryButtonLight}
            >
              Volver arriba
            </button>
          </div>
        </section>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
          "Hola Diego, quiero información sobre un vehículo Ford."
        )}`}
        style={floatingWhatsapp}
      >
        WhatsApp
      </a>
    </div>
  );
}

const heroBadge = {
  background: "rgba(255,255,255,0.12)",
  padding: "10px 14px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 700
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box"
};

const selectStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  fontSize: 15,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box"
};

const chipButton = {
  padding: "11px 15px",
  borderRadius: 999,
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer"
};

const typeBadge = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#1d4ed8",
  fontSize: 12,
  fontWeight: 800
};

const primaryButton = {
  marginTop: 16,
  background: "linear-gradient(135deg, #111827, #000000)",
  color: "white",
  border: "none",
  borderRadius: 14,
  padding: "14px 24px",
  fontSize: 17,
  fontWeight: 800,
  cursor: "pointer",
  boxShadow: "0 12px 24px rgba(0,0,0,0.18)"
};

const secondaryButton = {
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer"
};

const secondaryButtonLight = {
  marginTop: 16,
  background: "#f3f4f6",
  color: "#111827",
  border: "1px solid #d1d5db",
  borderRadius: 14,
  padding: "14px 24px",
  fontSize: 17,
  fontWeight: 800,
  cursor: "pointer"
};

const whatsButton = {
  background: "#15803d",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  fontWeight: 800,
  cursor: "pointer"
};

const floatingWhatsapp = {
  position: "fixed",
  right: 20,
  bottom: 20,
  background: "#16a34a",
  color: "white",
  textDecoration: "none",
  padding: "15px 20px",
  borderRadius: 999,
  fontWeight: 800,
  boxShadow: "0 14px 28px rgba(0,0,0,0.18)",
  zIndex: 1000
};
