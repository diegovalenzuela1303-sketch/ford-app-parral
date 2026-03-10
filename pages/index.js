import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const vehiclesBase = [
  {
    id: 1,
    name: "Ford Territory 2026",
    shortName: "Territory",
    price: "$559,900",
    type: "SUV",
    image:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/territory/2026/colorizer/v1/colorizer/gris-piedra/ford-territory-2026-camioneta-suv-tecnologica-color-gris-piedra.jpg.dam.full.high.jpg/1756926697802.jpg",
    tagline: "SUV familiar con gran tecnología y presencia.",
    specs: [
      "Motor 1.8L Turbo EcoBoost I4",
      "187 HP",
      "236 lb-pie de torque",
      "Transmisión de 7 velocidades",
      "Tracción delantera (FWD)",
      "Pantalla táctil de 12 pulgadas",
      "Clúster digital de 12 pulgadas",
      "4 modos de manejo"
    ],
    officialUrl: "https://www.ford.mx/suv/territory/2026/"
  },
  {
    id: 2,
    name: "Ford Ranger 2026",
    shortName: "Ranger",
    price: "$763,500",
    type: "Pickup",
    image:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/ranger/2026/models/ford-ranger-xl-2026-camioneta-pickup-4x2-versiones-precios-equipo.jpg",
    tagline: "Pickup fuerte para trabajo, ciudad y carretera.",
    specs: [
      "Motor 2.3L I4 EcoBoost gasolina",
      "270 HP",
      "310 lb-pie de torque",
      "Opción diésel 2.0L Panther",
      "168 HP en versión diésel",
      "299 lb-pie en versión diésel",
      "Versiones 4x2 y 4x4",
      "Enfoque trabajo + versatilidad"
    ],
    officialUrl: "https://www.ford.mx/camiones/ranger/2026/"
  },
  {
    id: 3,
    name: "Ford Ranger Raptor 2026",
    shortName: "Ranger Raptor",
    price: "$1,313,500",
    type: "Pickup Performance",
    image:
      "https://www.ford.mx/content/ford/mx/es_mx/ranger-raptor-2026-content/media-carousels/overview-features/jcr%3Acontent/par/mediacarouselitem/image.imgs.full.high.jpg/1758827332055.jpg",
    tagline: "La pickup deportiva para impacto total.",
    specs: [
      "Motor 3.0L V6 Twin Turbo",
      "392 HP",
      "430 lb-pie de torque",
      "Transmisión automática de 10 velocidades",
      "7 modos de manejo",
      "Pantalla SYNC 4 de 12 pulgadas",
      "Clúster digital de 12 pulgadas",
      "Capacidad todoterreno de alto nivel"
    ],
    officialUrl: "https://www.ford.mx/performance/raptor/ranger/2026/"
  },
  {
    id: 4,
    name: "Ford Maverick 2025",
    shortName: "Maverick",
    price: "$737,100",
    type: "Pickup",
    image:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/maverick/2025/models/ford-maverick-2025-camioneta-pickup-versiones-precios-equipo-xlt.jpg",
    tagline: "Pickup compacta, moderna y muy vendible.",
    specs: [
      "Versiones gasolina e híbrida",
      "Motor híbrido disponible",
      "191 HP combinados en versión híbrida",
      "Batería de iones de litio de 1.1 kWh",
      "Hasta 800 km por tanque en versión híbrida",
      "Audio B&O de 8 bocinas en equipamiento destacado",
      "Ideal para uso diario y negocio",
      "Diseño compacto y práctico"
    ],
    officialUrl: "https://www.ford.mx/camiones/maverick/2025/"
  },
  {
    id: 5,
    name: "Ford Bronco Sport 2026",
    shortName: "Bronco Sport",
    price: "$773,500",
    type: "SUV Off-Road",
    image:
      "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/bronco-sport/2026/models/ford-bronco-sport-2026-suv-todoterreno-offroad-version-big-bend.jpg",
    tagline: "SUV 4x4 para aventura, imagen y estilo.",
    specs: [
      "Motor 1.5L EcoBoost",
      "181 HP",
      "190 lb-pie de torque",
      "Motor 2.0L Turbo EcoBoost disponible",
      "250 HP en versiones superiores",
      "277 lb-pie de torque en 2.0L",
      "Capacidad 4x4",
      "Enfoque off-road y aventura"
    ],
    officialUrl: "https://www.ford.mx/suv/bronco-sport/2026/"
  },
  {
    id: 6,
    name: "Ford Mustang 2026",
    shortName: "Mustang",
    price: "$951,500",
    type: "Deportivo",
    image:
      "https://www.ford.mx/content/ford/mx/es_mx/mustang-content/2026/media-carousel/version/jcr%3Acontent/par/mediacarouselitem/image.imgs.full.high.jpg/1760544961974.jpg",
    tagline: "Deportivo icónico para venta aspiracional.",
    specs: [
      "Motor 2.3L EcoBoost",
      "315 HP",
      "350 lb-pie de torque",
      "Motor V8 5.0L GT disponible",
      "486 HP en versión GT",
      "500 HP en Dark Horse",
      "6 modos de manejo",
      "Perfil deportivo y premium"
    ],
    officialUrl: "https://www.ford.mx/autos/mustang/2026/"
  }
];

export default function Home() {
  const [vehicles] = useState(vehiclesBase);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [comentario, setComentario] = useState("");
  const [expandedId, setExpandedId] = useState(null);

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
      origen: origen
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

  async function handleWhatsAppClick(vehicleName) {
    await guardarProspecto({
      nombre: "Cliente Web",
      telefono: "Pendiente",
      vehiculo: vehicleName,
      comentario: "",
      origen: "whatsapp"
    });
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
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: 24
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a, #1e293b)",
            color: "white",
            borderRadius: 24,
            padding: 28,
            marginBottom: 24,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.12)",
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 13,
                  marginBottom: 12
                }}
              >
                App comercial Ford Parral
              </div>
              <h1 style={{ margin: 0, fontSize: 42, lineHeight: 1.1 }}>
                Diego Valenzuela
              </h1>
              <p style={{ marginTop: 8, fontSize: 22, opacity: 0.95 }}>
                Asesor Ford Parral
              </p>
              <p style={{ marginTop: 8, opacity: 0.85 }}>
                Catálogo visual + ficha técnica + captura de prospectos
              </p>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: 18,
                minWidth: 260
              }}
            >
              <p style={{ margin: "0 0 8px 0" }}>
                <b>WhatsApp:</b> 6272850550
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                <b>Zona:</b> Parral y región
              </p>
              <p style={{ margin: 0 }}>
                <b>Acceso privado:</b> /admin
              </p>
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
            Deja tus datos y te contacto con la mejor opción.
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
          <h2 style={{ marginBottom: 6 }}>Catálogo Ford</h2>
          <p style={{ margin: 0, color: "#4b5563" }}>
            Fotos oficiales, precio base y ficha técnica rápida.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18
          }}
        >
          {vehicles.map((v) => {
            const expanded = expandedId === v.id;

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
                  src={v.image}
                  alt={v.name}
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
                        {v.type}
                      </div>
                      <h3 style={{ margin: "0 0 6px 0", fontSize: 24 }}>
                        {v.shortName}
                      </h3>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>
                        Precio desde
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 22,
                          fontWeight: 700,
                          color: "#111827"
                        }}
                      >
                        {v.price}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: "#4b5563", marginTop: 10 }}>{v.tagline}</p>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginTop: 14
                    }}
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expanded ? null : v.id)
                      }
                      style={secondaryButton}
                    >
                      {expanded ? "Ocultar ficha" : "Ver ficha técnica"}
                    </button>

                    <a
                      href={`https://wa.me/526272850550?text=Hola me interesa ${encodeURIComponent(
                        v.name
                      )}`}
                      onClick={() => handleWhatsAppClick(v.name)}
                      style={linkButton}
                    >
                      WhatsApp
                    </a>

                    <a
                      href={v.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={ghostLink}
                    >
                      Sitio oficial
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
                      <h4 style={{ marginTop: 0, marginBottom: 10 }}>
                        Ficha técnica rápida
                      </h4>

                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: 18,
                          color: "#374151",
                          lineHeight: 1.7
                        }}
                      >
                        {v.specs.map((item, idx) => (
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
  cursor: "pointer",
  textDecoration: "none"
};

const linkButton = {
  background: "#16a34a",
  color: "white",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 14,
  textDecoration: "none",
  display: "inline-block"
};

const ghostLink = {
  background: "#f3f4f6",
  color: "#111827",
  borderRadius: 10,
  padding: "10px 14px",
  fontSize: 14,
  textDecoration: "none",
  display: "inline-block"
};
