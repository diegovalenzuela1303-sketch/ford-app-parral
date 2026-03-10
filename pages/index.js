import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const whatsappBase = process.env.NEXT_PUBLIC_WHATSAPP || "526272850550";
const asesorFoto = "/diego-asesor.jpg";

const catalogo = [
  {
    id: 1,
    categoria: "SUV",
    nombre: "Ford Territory 2026",
    corto: "Territory",
    precioBase: "$559,900",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/territory/2026/colorizer/v1/colorizer/gris-piedra/ford-territory-2026-camioneta-suv-tecnologica-color-gris-piedra.jpg.dam.full.high.jpg/1756926697802.jpg",
    frase: "La SUV que proyecta seguridad, tecnología y presencia desde la primera vista.",
    gancho: "Más espacio, mejor imagen y tecnología que sí se nota.",
    ficha: [
      "Motor 1.8L Turbo EcoBoost I4",
      "187 HP",
      "236 lb-pie de torque",
      "Transmisión automática de 7 velocidades",
      "Pantalla de 12 pulgadas",
      "Clúster digital de 12 pulgadas",
      "4 modos de manejo"
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
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/ranger/2026/models/ford-ranger-xl-2026-camioneta-pickup-4x2-versiones-precios-equipo.jpg",
    frase: "La pickup que trabaja duro entre semana y luce fuerte todos los días.",
    gancho: "Potencia, versatilidad y presencia para campo, ciudad y negocio.",
    ficha: [
      "Motor 2.3L EcoBoost gasolina disponible",
      "270 HP en gasolina",
      "310 lb-pie de torque en gasolina",
      "Motor diésel 2.0L disponible",
      "Versiones 4x2 y 4x4",
      "Enfoque trabajo + uso diario"
    ],
    versiones: [
      { nombre: "XL 4x2", precio: "$763,500" },
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
      "https://www.ford.mx/content/ford/mx/es_mx/ranger-raptor-2026-content/media-carousels/overview-features/jcr%3Acontent/par/mediacarouselitem/image.imgs.full.high.jpg/1758827332055.jpg",
    frase: "No es solo una pickup, es una declaración de poder y presencia.",
    gancho: "Impacta, acelera y domina cualquier terreno con imagen brutal.",
    ficha: [
      "Motor 3.0L V6 Twin Turbo",
      "392 HP",
      "430 lb-pie de torque",
      "Transmisión automática de 10 velocidades",
      "SYNC 4 con pantalla de 12 pulgadas",
      "7 modos de manejo"
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
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/maverick/2025/models/ford-maverick-2025-camioneta-pickup-versiones-precios-equipo-xlt.jpg",
    frase: "La pickup inteligente para emprender, moverte diario y vender mejor tu imagen.",
    gancho: "Compacta por fuera, muy útil por dentro y con perfil ganador.",
    ficha: [
      "Versiones gasolina e híbrida",
      "191 HP combinados en híbrida",
      "Hasta 800 km por tanque en híbrida",
      "Diseño práctico y moderno",
      "Ideal para ciudad, negocio y uso diario"
    ],
    versiones: [
      { nombre: "XLT", precio: "$737,100" },
      { nombre: "Lariat", precio: "Consulta precio" },
      { nombre: "Híbrida", precio: "Consulta precio" }
    ]
  },
  {
    id: 5,
    categoria: "SUV",
    nombre: "Ford Bronco Sport 2026",
    corto: "Bronco Sport",
    precioBase: "$773,500",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/bronco-sport/2026/models/ford-bronco-sport-2026-suv-todoterreno-offroad-version-big-bend.jpg",
    frase: "Diseñada para quien no quiere pasar desapercibido ni en ciudad ni en aventura.",
    gancho: "Aventura, estilo y carácter en una sola SUV.",
    ficha: [
      "Motor 1.5L EcoBoost",
      "181 HP",
      "Motor 2.0L Turbo disponible",
      "250 HP en versiones superiores",
      "Capacidad 4x4",
      "Perfil off-road y aspiracional"
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
      "https://www.ford.mx/content/ford/mx/es_mx/mustang-content/2026/media-carousel/version/jcr%3Acontent/par/mediacarouselitem/image.imgs.full.high.jpg/1760544961974.jpg",
    frase: "No todos compran un auto; algunos compran una forma de destacar.",
    gancho: "Pasión, sonido y presencia que cierran miradas desde el primer segundo.",
    ficha: [
      "Motor 2.3L EcoBoost",
      "315 HP",
      "350 lb-pie de torque",
      "V8 5.0L GT disponible",
      "486 HP en GT",
      "Hasta 500 HP en Dark Horse"
    ],
    versiones: [
      { nombre: "EcoBoost", precio: "$951,500" },
      { nombre: "GT", precio: "Consulta precio" },
      { nombre: "Dark Horse", precio: "Consulta precio" }
    ]
  },
  {
    id: 7,
    categoria: "Pickup",
    nombre: "Ford F-150 2025",
    corto: "F-150",
    precioBase: "$1,008,100",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/f150/2025/versions/f150-xl-regular-cab-v6-4x2-8-box.jpg",
    frase: "Cuando el trabajo exige resultados, F-150 responde con fuerza real.",
    gancho: "Capacidad, imagen y respaldo para quien no puede darse el lujo de fallar.",
    ficha: [
      "Motor 2.7L V6 disponible",
      "325 HP",
      "400 lb-pie de torque",
      "Motor 5.0L V8 disponible",
      "400 HP",
      "410 lb-pie de torque",
      "Configuraciones 4x2 y 4x4"
    ],
    versiones: [
      { nombre: "XL Cabina Regular V6 4x2 Caja 8'", precio: "$1,008,100" },
      { nombre: "XL Cabina y Media V6 4x2 Caja 6.5'", precio: "$1,042,100" },
      { nombre: "XL Doble Cabina V6 4x2 Caja 5.5'", precio: "$1,050,100" },
      { nombre: "XL Doble Cabina V6 4x4 Caja 5.5'", precio: "$1,092,100" },
      { nombre: "XL Doble Cabina V8 4x4 Caja 5.5'", precio: "$1,187,100" },
      { nombre: "XLT Cabina y Media V8 4x4", precio: "$1,232,100" },
      { nombre: "XLT Doble Cabina V8 4x2", precio: "$1,276,100" },
      { nombre: "XLT Doble Cabina V8 4x4", precio: "$1,332,100" }
    ]
  },
  {
    id: 8,
    categoria: "Pickup Premium",
    nombre: "Ford Lobo 2025",
    corto: "Lobo",
    precioBase: "$1,417,100",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/lobo/2025/models/ford-lobo-2025-pickup-4x4-versiones-precios-equipo-lariat.jpg",
    frase: "Una pickup premium que impone respeto antes de arrancar.",
    gancho: "Lujo, capacidad y estatus en una sola unidad.",
    ficha: [
      "Pickup 4x4 premium",
      "Versiones orientadas a lujo, trabajo y aventura",
      "Tecnología, confort y gran presencia",
      "Versiones HEV disponibles en gama alta"
    ],
    versiones: [
      { nombre: "Tremor", precio: "$1,417,100" },
      { nombre: "Lariat", precio: "$1,428,100" },
      { nombre: "King Ranch", precio: "$1,499,000" },
      { nombre: "Tremor High", precio: "$1,572,100" },
      { nombre: "Platinum", precio: "$1,615,100" },
      { nombre: "Platinum Plus HEV", precio: "$1,789,100" }
    ]
  },
  {
    id: 9,
    categoria: "Camión Pickup",
    nombre: "Ford Super Duty F-250 2026",
    corto: "F-250",
    precioBase: "$1,560,800",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/f250/2026/models/ford-super-duty-f250-2026-pickup-xlt-versiones-precios-equipo.jpg",
    frase: "Si el trabajo es pesado, necesitas una unidad que lo soporte de verdad.",
    gancho: "Capacidad bruta, presencia fuerte y respaldo para jale serio.",
    ficha: [
      "Motor 6.7L V8 Diésel",
      "500 HP",
      "1,200 lb-pie de torque",
      "Transmisión TorqShift de 10 velocidades",
      "Carga de hasta 1,500 kg",
      "Arrastre de hasta 9,977 kg"
    ],
    versiones: [
      { nombre: "XLT", precio: "$1,560,800" },
      { nombre: "King Ranch", precio: "$1,962,400" },
      { nombre: "Platinum Plus", precio: "$2,477,500" }
    ]
  },
  {
    id: 10,
    categoria: "Camión Chasis",
    nombre: "Ford Super Duty F-350 2026",
    corto: "F-350",
    precioBase: "$1,081,600",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/super-duty-chasis/2026/models/ford-super-duty-chasis-2026-camion-de-trabajo-version-f350-xl-gasolina.jpg",
    frase: "Para carrozar, cargar y producir: una base de trabajo que sí deja dinero.",
    gancho: "El aliado ideal para negocio, carga y trabajo rudo en la región.",
    ficha: [
      "Base ideal para carrozado",
      "Pensada para trabajo pesado",
      "Enfoque carga, flotilla y operación diaria",
      "Excelente opción para negocio y campo"
    ],
    versiones: [
      { nombre: "F-350 XL Gasolina", precio: "$1,081,600" },
      { nombre: "F-350 XL Plus Gasolina", precio: "$1,098,600" },
      { nombre: "F-350 XL Gasolina Doble Cabina", precio: "$1,128,900" }
    ]
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
          background: "linear-gradient(135deg, #dbeafe, #e5e7eb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#374151",
          fontWeight: 700,
          fontSize: 22
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
        display: "block",
        background: "#e5e7eb"
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
          width: 280,
          height: 360,
          borderRadius: 24,
          background: "linear-gradient(135deg, #1e293b, #0f172a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: 20
        }}
      >
        Sube tu foto a public/diego-asesor.jpg
      </div>
    );
  }

  return (
    <img
      src={asesorFoto}
      alt="Diego Valenzuela"
      onError={() => setError(true)}
      style={{
        width: 280,
        height: 360,
        objectFit: "cover",
        borderRadius: 24,
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        display: "block"
      }}
    />
  );
}

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [comentario, setComentario] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [expandedId, setExpandedId] = useState(null);
  const [versionSeleccionada, setVersionSeleccionada] = useState({});

  const categorias = useMemo(
    () => ["Todos", ...new Set(catalogo.map((v) => v.categoria))],
    []
  );

  const vehicles = useMemo(() => {
    if (categoriaActiva === "Todos") return catalogo;
    return catalogo.filter((v) => v.categoria === categoriaActiva);
  }, [categoriaActiva]);

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

  async function handleWhatsAppClick(modelo, versionTexto) {
    await guardarProspecto({
      nombre: "Cliente Web",
      telefono: "Pendiente",
      vehiculo: `${modelo}${versionTexto ? " - " + versionTexto : ""}`,
      comentario: "",
      origen: "whatsapp"
    });
  }

  function obtenerVersionActual(vehicle) {
    const selectedIndex = versionSeleccionada[vehicle.id] ?? 0;
    return vehicle.versiones[selectedIndex];
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
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: 24 }}>
        <section
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,41,59,0.92))",
            borderRadius: 32,
            padding: 28,
            marginBottom: 26,
            color: "white",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(59,130,246,0.18), transparent 30%)"
            }}
          />

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: 26,
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
                  marginBottom: 14
                }}
              >
                Catálogo Ford Parral
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 52,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em"
                }}
              >
                Diego Valenzuela
              </h1>

              <p style={{ marginTop: 10, fontSize: 28, opacity: 0.96 }}>
                Asesor Profesional Ford Parral
              </p>

              <p
                style={{
                  marginTop: 12,
                  fontSize: 18,
                  lineHeight: 1.6,
                  maxWidth: 760,
                  color: "rgba(255,255,255,0.88)"
                }}
              >
                Pickups, SUVs y camiones Ford con enfoque comercial, atención directa
                y cotización por WhatsApp según la versión que elijas.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginTop: 18
                }}
              >
                <div style={heroPill}>📲 WhatsApp: 6272850550</div>
                <div style={heroPill}>📍 Parral y región</div>
                <div style={heroPill}>🔒 Panel privado: /admin</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <FotoAsesor />
            </div>
          </div>
        </section>

        <section
          style={{
            background: "white",
            borderRadius: 24,
            padding: 24,
            marginBottom: 28,
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 34 }}>
            Solicitar información
          </h2>
          <p style={{ marginTop: 0, color: "#4b5563", fontSize: 16 }}>
            Déjame tus datos y te contacto con opción, promoción y plan disponible.
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
              minHeight: 100,
              marginTop: 14,
              resize: "vertical"
            }}
          />

          <button onClick={enviarFormulario} style={primaryButton}>
            Enviar solicitud
          </button>
        </section>

        <section style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 8, fontSize: 34 }}>Explora el catálogo</h2>
          <p style={{ marginTop: 0, color: "#4b5563", fontSize: 16 }}>
            Selecciona categoría, revisa ficha técnica y pide cotización por versión.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                style={{
                  ...chipButton,
                  background: categoriaActiva === cat ? "#111827" : "#ffffff",
                  color: categoriaActiva === cat ? "#ffffff" : "#111827",
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
          {vehicles.map((v) => {
            const expanded = expandedId === v.id;
            const versionActual = obtenerVersionActual(v);

            const mensaje = `Hola Diego, quiero cotización de ${v.nombre} versión ${versionActual.nombre}. ¿Me apoyas con precio, promoción y opciones de financiamiento?`;
            const whatsappHref = `https://wa.me/${whatsappBase}?text=${encodeURIComponent(
              mensaje
            )}`;

            return (
              <article
                key={v.id}
                style={{
                  background: "white",
                  borderRadius: 26,
                  overflow: "hidden",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb"
                }}
              >
                <ImagenVehiculo src={v.imagen} alt={v.corto} />

                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12
                    }}
                  >
                    <div>
                      <div style={typeBadge}>{v.categoria}</div>
                      <h3
                        style={{
                          margin: "10px 0 6px 0",
                          fontSize: 32,
                          lineHeight: 1.05
                        }}
                      >
                        {v.corto}
                      </h3>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>Desde</div>
                      <div style={{ fontSize: 28, fontWeight: 800 }}>{v.precioBase}</div>
                    </div>
                  </div>

                  <p
                    style={{
                      margin: "10px 0 10px 0",
                      fontSize: 20,
                      fontWeight: 800,
                      lineHeight: 1.3
                    }}
                  >
                    {v.frase}
                  </p>

                  <p style={{ marginTop: 0, color: "#4b5563", fontSize: 16 }}>
                    {v.gancho}
                  </p>

                  <div
                    style={{
                      marginTop: 16,
                      padding: 14,
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: 16
                    }}
                  >
                    <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
                      Elige versión
                    </div>

                    <select
                      value={versionSeleccionada[v.id] ?? 0}
                      onChange={(e) =>
                        setVersionSeleccionada((prev) => ({
                          ...prev,
                          [v.id]: Number(e.target.value)
                        }))
                      }
                      style={selectStyle}
                    >
                      {v.versiones.map((ver, idx) => (
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
                      onClick={() => setExpandedId(expanded ? null : v.id)}
                      style={secondaryButton}
                    >
                      {expanded ? "Ocultar ficha" : "Ver ficha técnica"}
                    </button>

                    <a
                      href={whatsappHref}
                      onClick={() => handleWhatsAppClick(v.nombre, versionActual.nombre)}
                      style={whatsButton}
                    >
                      Pedir cotización
                    </a>
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
                        {v.ficha.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

const heroPill = {
  background: "rgba(255,255,255,0.12)",
  padding: "10px 14px",
  borderRadius: 999,
  fontSize: 14
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

const primaryButton = {
  marginTop: 16,
  background: "linear-gradient(135deg, #111827, #000000)",
  color: "white",
  border: "none",
  borderRadius: 14,
  padding: "14px 24px",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 10px 24px rgba(0,0,0,0.18)"
};

const secondaryButton = {
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer"
};

const whatsButton = {
  background: "#15803d",
  color: "white",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 15,
  fontWeight: 700,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
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
  fontWeight: 700
};
