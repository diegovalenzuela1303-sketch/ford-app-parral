import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Admin() {
  const [prospectos, setProspectos] = useState([]);
  const [clave, setClave] = useState("");
  const [acceso, setAcceso] = useState(false);

  async function cargarProspectos() {
    const { data, error } = await supabase
      .from("prospectos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProspectos(data);
    }
  }

  useEffect(() => {
    if (acceso) {
      cargarProspectos();
    }
  }, [acceso]);

  function login() {
    if (clave === "ford2026") {
      setAcceso(true);
    } else {
      alert("Clave incorrecta");
    }
  }

  if (!acceso) {
    return (
      <div style={{ padding: 40, fontFamily: "Arial" }}>
        <h2>Acceso Administrador</h2>

        <input
          type="password"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />

        <br /><br />

        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Panel de Prospectos</h1>

      {prospectos.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginTop: 10
          }}
        >
          <p><b>Nombre:</b> {p.nombre}</p>
          <p><b>Teléfono:</b> {p.telefono}</p>
          <p><b>Vehículo:</b> {p.vehiculo}</p>
          <p><b>Comentario:</b> {p.comentario}</p>
          <p><b>Origen:</b> {p.origen}</p>
          <p><b>Fecha:</b> {new Date(p.created_at).toLocaleString()}</p>

          <a
            href={`https://wa.me/52${p.telefono}?text=Hola ${p.nombre}, te contacto de Ford Parral sobre ${p.vehiculo}`}
            target="_blank"
          >
            Contactar por WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}
