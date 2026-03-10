import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const whatsappBase = process.env.NEXT_PUBLIC_WHATSAPP || "526272850550";

const catalogo = [
  {
    id: 1,
    categoria: "SUV",
    nombre: "Ford Territory 2026",
    corto: "Territory",
    precio: "$559,900",
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
      { nombre: "Trend", precio: "Consulta versión y disponibilidad" },
      { nombre: "Titanium", precio: "Consulta versión y disponibilidad" }
    ]
  },
  {
    id: 2,
    categoria: "Pickup",
    nombre: "Ford Ranger 2026",
    corto: "Ranger",
    precio: "$763,500",
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
      { nombre: "XLT", precio: "Consulta versión y precio" },
      { nombre: "Lariat", precio: "Consulta versión y precio" }
    ]
  },
  {
    id: 3,
    categoria: "Pickup Performance",
    nombre: "Ford Ranger Raptor 2026",
    corto: "Ranger Raptor",
    precio: "$1,313,500",
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
    versiones: [
      { nombre: "Raptor", precio: "$1,313,500" }
    ]
  },
  {
    id: 4,
    categoria: "Pickup",
    nombre: "Ford Maverick 2025",
    corto: "Maverick",
    precio: "$737,100",
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
      { nombre: "Lariat", precio: "Consulta versión y precio" },
      { nombre: "Híbrida", precio: "Consulta versión y precio" }
    ]
  },
  {
    id: 5,
    categoria: "SUV",
    nombre: "Ford Bronco Sport 2026",
    corto: "Bronco Sport",
    precio: "$773,500",
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
      { nombre: "Outer Banks", precio: "Consulta versión y precio" },
      { nombre: "Badlands", precio: "Consulta versión y precio" }
    ]
  },
  {
    id: 6,
    categoria: "Deportivo",
    nombre: "Ford Mustang 2026",
    corto: "Mustang",
    precio: "$951,500",
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
      { nombre: "GT", precio: "Consulta versión y precio" },
      { nombre: "Dark Horse", precio: "Consulta versión y precio" }
    ]
  },
  {
    id: 7,
    categoria: "Pickup",
    nombre: "Ford F-150 2025",
    corto: "F-150",
    precio: "$1,008,100",
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
    precio: "$1,417,100",
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
    precio: "$1,560,800",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/f250/2026/models/ford-super-duty-f250-2026-pickup-xlt-versiones-precios-equipo.jpg",
    frase: "Si el trabajo es pesado, necesitas una unidad que lo soporte de verdad.",
    gancho: "Capacidad bruta, presencia fuerte y respaldo para jale serio.",
    ficha: [
      "Motor 6.7L V8 Diésel",
      "500 HP",
      "1,200 lb-pie de torque",
      "Transmisión de 10 velocidades TorqShift",
      "Capacidad de carga de hasta 1,500 kg",
      "Capacidad de arrastre de 9,977 kg"
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
    nombre: "Ford Super Duty Chasis 2026",
    corto: "F-350",
    precio: "$1,081,600",
    imagen:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/super-duty-chasis/2026/models/ford-super-duty-chasis-2026-camion-de-trabajo-version-f350-xl-gasolina.jpg",
    frase: "Para carrozar, cargar y producir: una base de trabajo que sí deja dinero.",
    gancho: "El aliado ideal para negocio, carga y trabajo rudo en la región.",
    ficha: [
      "Plataforma de trabajo para carrozado",
      "Versiones F-350 y superiores",
      "Enfoque carga, flotilla y trabajo pesado",
      "Ideal para negocio, campo y operación diaria"
    ],
    versiones: [
      { nombre: "F-350 XL Gasolina", precio: "$1,081,600" },
      { nombre: "F-350 XL Plus Gasolina", precio: "$1,098,600" },
      { nombre: "F-350 XL Gasolina Doble Cabina", precio: "$1,128,900" }
    ]
  }
];

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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: 24 }}>
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            color: "white",
            borderRadius: 24,
            padding: 28,
            marginBottom: 24
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "space-between" }}>
            <div style={{ maxWidth: 760 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.14)",
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 13,
                  marginBottom: 12
                }}
              >
                Catálogo Ford Parral
              </div>
              <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.05 }}>
                Diego Valenzuela
              </h1>
              <p style={{ marginTop: 8, fontSize: 22, opacity: 0.95 }}>
                Asesor Ford Parral
              </p>
              <p style={{ marginTop: 10, opacity: 0.9, maxWidth: 700 }}>
                Pickups, SUVs y camiones Ford con enfoque comercial, versiones clave para la región
                y contacto directo por WhatsApp para cotización actualizada.
              </p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 18,
                minWidth: 250
              }}
            >
              <p style={{ margin: "0 0 8px 0" }}><b>WhatsApp:</b> 6272850550</p>
              <p style={{ margin: "0 0 8px 0" }}><b>Zona:</b> Parral y región</p>
              <p style={{ margin: 0 }}><b>Panel privado:</b> /admin</p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 20,
            padding: 24,
            marginBottom: 28,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
          }}
        >
          <h2 style={{ marginTop: 0 }}>Solicitar información</h2>
          <p style={{ color: "#4b5563", marginTop: 0 }}>
            Déjame tus datos y te contacto con opción, promoción y plan disponible al momento.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 12
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
            <input
              placeholder="Comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button onClick={enviarFormulario} style={primaryButton}>
            Enviar solicitud
          </button>
        </div>

        <div style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 8 }}>Explora el catálogo</h2>
          <p style={{ marginTop: 0, color: "#4b5563" }}>
            Selecciona categoría, revisa ficha rápida y pide cotización por versión.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                style={{
                  ...chipButton,
                  background: categoriaActiva === cat ? "#111827" : "#ffffff",
                  color: categoriaActiva === cat ? "#ffffff" : "#111827",
                  border: categoriaActiva === cat ? "1px solid #111827" : "1px solid #d1d5db"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 18
          }}
        >
          {vehicles.map((v) => {
            const expanded = expandedId === v.id;
            const versionActual = obtenerVersionActual(v);

            const mensaje = `Hola Diego, quiero cotización de ${v.nombre} versión ${versionActual.nombre}. ¿Me apoyas con precio, promoción y opciones de financiamiento?`;
            const whatsappHref = `https://wa.me/${whatsappBase}?text=${encodeURIComponent(mensaje)}`;

            return (
              <div
                key={v.id}
                style={{
                  background: "white",
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb"
                }}
              >
                <img
                  src={v.imagen}
                  alt={v.nombre}
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    display: "block",
                    background: "#e5e7eb"
                  }}
                />

                <div style={{ padding: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      alignItems: "start"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          borderRadius: 999,
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          fontSize: 12,
                          marginBottom: 10
                        }}
                      >
                        {v.categoria}
                      </div>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: 24 }}>{v.corto}</h3>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>Precio base</p>
                      <p style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{v.precio}</p>
                    </div>
                  </div>

                  <p style={{ marginTop: 10, marginBottom: 10, fontWeight: 700 }}>
                    {v.frase}
                  </p>
                  <p style={{ color: "#4b5563", marginTop: 0 }}>{v.gancho}</p>

                  <div style={{ marginTop: 14 }}>
                    <label style={{ display: "block", fontSize: 13, marginBottom: 6, color: "#374151" }}>
                      Selecciona versión
                    </label>
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
                      marginTop: 14,
                      padding: 12,
                      background: "#f9fafb",
                      borderRadius: 14,
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <p style={{ margin: "0 0 6px 0", fontSize: 13, color: "#6b7280" }}>
                      Versión seleccionada
                    </p>
                    <p style={{ margin: "0 0 4px 0", fontWeight: 700 }}>{versionActual.nombre}</p>
                    <p style={{ margin: 0, color: "#111827" }}>{versionActual.precio}</p>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
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
                        marginTop: 18,
                        padding: 16,
                        background: "#f9fafb",
                        borderRadius: 16,
                        border: "1px solid #e5e7eb"
                      }}
                    >
                      <h4 style={{ marginTop: 0, marginBottom: 10 }}>Ficha técnica rápida</h4>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "#374151", lineHeight: 1.7 }}>
                        {v.ficha.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box"
};

const selectStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box"
};

const primaryButton = {
  marginTop: 16,
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "12px 18px",
  fontSize: 15,
  cursor: "pointer"
};

const secondaryButton = {
  background: "#111827",
  color: "white",
  border: "none",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 14,
  cursor: "pointer"
};

const whatsButton = {
  background: "#16a34a",
  color: "white",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 14,
  textDecoration: "none",
  display: "inline-block"
};

const chipButton = {
  padding: "10px 14px",
  borderRadius: 999,
  fontSize: 14,
  cursor: "pointer"
};
