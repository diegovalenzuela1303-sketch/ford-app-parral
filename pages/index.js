import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const vehiclesBase = [
  { id: 1, name: "Ford Territory", price: "$599,000", type: "SUV" },
  { id: 2, name: "Ford Ranger", price: "$763,500", type: "Pickup" },
  { id: 3, name: "Ford Ranger Raptor", price: "$1,313,500", type: "Pickup" },
  { id: 4, name: "Ford Maverick", price: "$749,000", type: "Pickup" },
  { id: 5, name: "Ford Bronco Sport", price: "$773,500", type: "SUV" },
  { id: 6, name: "Ford Mustang", price: "$1,050,000", type: "Performance" }
];

export default function Home() {
  const [vehicles, setVehicles] = useState(vehiclesBase);
  const [admin, setAdmin] = useState(false);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [comentario, setComentario] = useState("");

  function updatePrice(id, value) {
    setVehicles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: value } : item))
    );
  }

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

    const { data, error } = await supabase.from("prospectos").insert([payload]);

    if (error) {
      console.error("Error guardando prospecto:", error);
      alert("No se pudo guardar el prospecto");
      return false;
    }

    console.log("Prospecto guardado:", data);
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
    <div style={{ fontFamily: "Arial", padding: 40 }}>
      <h1>Diego Valenzuela | Asesor Ford Parral</h1>
      <p>Contacto WhatsApp: 6272850550</p>

      <button onClick={() => setAdmin(!admin)}>
        {admin ? "Salir Admin" : "Modo Admin"}
      </button>

      <h2 style={{ marginTop: 30 }}>Solicitar información</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ display: "block", marginBottom: 12, width: 260, padding: 8 }}
      />

      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        style={{ display: "block", marginBottom: 12, width: 260, padding: 8 }}
      />

      <input
        placeholder="Vehículo de interés"
        value={vehiculo}
        onChange={(e) => setVehiculo(e.target.value)}
        style={{ display: "block", marginBottom: 12, width: 260, padding: 8 }}
      />

      <textarea
        placeholder="Comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        style={{ display: "block", marginBottom: 12, width: 260, padding: 8, minHeight: 70 }}
      />

      <button onClick={enviarFormulario}>Enviar solicitud</button>

      <h2 style={{ marginTop: 40 }}>Catálogo Ford</h2>

      {vehicles.map((v) => (
        <div
          key={v.id}
          style={{ border: "1px solid #ddd", padding: 15, marginTop: 10 }}
        >
          <h3>{v.name}</h3>
          <p>Tipo: {v.type}</p>
          <p>Precio: {v.price}</p>

          {admin && (
            <input
              value={v.price}
              onChange={(e) => updatePrice(v.id, e.target.value)}
              style={{ display: "block", marginBottom: 12, padding: 6 }}
            />
          )}

          <a
            href={`https://wa.me/526272850550?text=Hola me interesa ${encodeURIComponent(
              v.name
            )}`}
            onClick={() => handleWhatsAppClick(v.name)}
          >
            Contactar por WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}
