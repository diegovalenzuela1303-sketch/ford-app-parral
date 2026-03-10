import { useEffect, useMemo, useState } from "react";

const SETTINGS_KEY = "fordAppSettings";
const CATALOG_KEY = "fordAppCatalog";
const ADMIN_AUTH_KEY = "fordAdminAuth";

const DEFAULT_SETTINGS = {
  asesorNombre: "Diego Valenzuela",
  telefono: "6272850550",
  ciudad: "Hidalgo del Parral, Chihuahua",
  slogan: "Asesor profesional en vehículos Ford",
  heroTitulo: "Catálogo Ford profesional para Parral y la región",
  heroTexto:
    "Explora pickups, SUVs, vans y versiones especiales Ford. Atención directa, ficha técnica y contacto inmediato por WhatsApp.",
  avisoLegal: "Precios sujetos a cambio sin previo aviso.",
  passwordAdmin: "FordParral2026",
};

const DEFAULT_CATALOG = [
  {
    id: "maverick-2025",
    nombre: "Ford Maverick 2025",
    categoria: "Pickup",
    precio: "$737,100",
    badge: "Entrada inteligente",
    imagen: "/maverick.jpg",
    descripcion:
      "Pickup versátil, accesible y muy atractiva para clientes que quieren presencia, comodidad y practicidad.",
    dialogo:
      "Si buscas una pickup práctica, moderna y rendidora para uso diario, la Maverick puede ser tu mejor opción.",
    versiones: ["XLT", "Lariat"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Maverick 2025. ¿Me compartes versiones, precio y disponibilidad?",
    caracteristicas: [
      "Ideal para ciudad y carretera",
      "Excelente equilibrio entre tamaño y funcionalidad",
      "Muy atractiva para clientes jóvenes y familias",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Configurable según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "Según versión" },
      { etiqueta: "Cabina", valor: "Doble cabina" },
    ],
  },
  {
    id: "maverick-hibrida-2026",
    nombre: "Ford Maverick Híbrida 2026",
    categoria: "Pickup",
    precio: "$770,700",
    badge: "Híbrida",
    imagen: "/maverick-hibrida.jpg",
    descripcion:
      "Una pickup híbrida para quien quiere economía de consumo sin perder imagen y versatilidad.",
    dialogo:
      "Esta Maverick Híbrida es ideal para quien quiere una pickup moderna, con tecnología y enfoque en ahorro.",
    versiones: ["XLT", "Lariat"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Maverick Híbrida 2026. ¿Me das información y precio?",
    caracteristicas: [
      "Tecnología híbrida",
      "Buena opción para trayectos diarios",
      "Imagen moderna y diferenciada",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Sistema híbrido según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "Según versión" },
      { etiqueta: "Cabina", valor: "Doble cabina" },
    ],
  },
  {
    id: "ranger-2025",
    nombre: "Ford Ranger 2025",
    categoria: "Pickup",
    precio: "$750,900",
    badge: "Trabajo y aventura",
    imagen: "/ranger.jpg",
    descripcion:
      "Pickup robusta para quien necesita capacidad real, tecnología y presencia en todo tipo de terreno.",
    dialogo:
      "La Ranger es perfecta para quien quiere una pickup fuerte, moderna y lista para trabajo o aventura.",
    versiones: ["XLT", "Limited", "Wildtrak"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Ranger 2025. ¿Qué versiones manejas y cuál me recomiendas?",
    caracteristicas: [
      "Gran equilibrio entre trabajo y confort",
      "Diseño agresivo y moderno",
      "Muy buscada por clientes de uso mixto",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Diésel o gasolina según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x2 o 4x4 según versión" },
      { etiqueta: "Cabina", valor: "Doble cabina" },
    ],
  },
  {
    id: "ranger-raptor-2026",
    nombre: "Ford Ranger Raptor 2026",
    categoria: "Performance",
    precio: "$1,313,500",
    badge: "Performance",
    imagen: "/ranger-raptor-2026.jpg",
    descripcion:
      "La pickup de alto impacto para clientes que buscan adrenalina, diseño y exclusividad.",
    dialogo:
      "Si quieres algo que realmente robe miradas y tenga personalidad propia, la Ranger Raptor 2026 es esa unidad.",
    versiones: ["Raptor"],
    whatsappTexto:
      "Hola Diego, me interesa la Ranger Raptor 2026. ¿Qué me puedes compartir de esta unidad?",
    caracteristicas: [
      "Muy alta presencia comercial",
      "Ideal para contenido de marketing",
      "Unidad aspiracional y llamativa",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Performance" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Off-road de alto desempeño" },
    ],
  },
  {
    id: "f150-2025",
    nombre: "Ford F-150 2025",
    categoria: "Pickup",
    precio: "$1,008,100",
    badge: "Pickup icónica",
    imagen: "/f-150.jpg",
    descripcion:
      "La pickup más reconocida para clientes que buscan fuerza, presencia y respaldo de marca.",
    dialogo:
      "La F-150 es para quien quiere una pickup seria, poderosa y con una imagen que inspira confianza.",
    versiones: ["XLT", "Lariat", "Platinum"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford F-150 2025. ¿Qué versiones manejas y cuál conviene más?",
    caracteristicas: [
      "Prestigio de marca",
      "Gran opción para clientes exigentes",
      "Muy fuerte en trabajo y presencia",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Gasolina / HEV según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x2 o 4x4" },
      { etiqueta: "Cabina", valor: "Doble cabina" },
    ],
  },
  {
    id: "lobo-2025",
    nombre: "Ford Lobo 2025",
    categoria: "Pickup premium",
    precio: "$1,417,100",
    badge: "Premium",
    imagen: "/lobo.jpg",
    descripcion:
      "Pickup premium para quien quiere lujo, potencia y una imagen de alto nivel.",
    dialogo:
      "La Lobo está hecha para quien quiere una pickup premium, elegante y con presencia ejecutiva.",
    versiones: ["Lariat", "Platinum"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Lobo 2025. ¿Me compartes precio y versiones disponibles?",
    caracteristicas: [
      "Cabina con enfoque premium",
      "Presencia fuerte y elegante",
      "Muy atractiva para clientes ejecutivos",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4 según versión" },
      { etiqueta: "Interior", valor: "Enfoque premium" },
    ],
  },
  {
    id: "f250-2026",
    nombre: "Ford Super Duty F-250 2026",
    categoria: "Trabajo pesado",
    precio: "$1,560,800",
    badge: "Super Duty",
    imagen: "/f-250-2026.jpg",
    descripcion:
      "Pensada para clientes que requieren capacidad, robustez y una unidad de trabajo con presencia.",
    dialogo:
      "Si el cliente necesita una pickup fuerte para trabajar de verdad, la F-250 2026 es una opción muy seria.",
    versiones: ["XLT", "Lariat"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Super Duty F-250 2026. ¿Me puedes compartir información?",
    caracteristicas: [
      "Gran capacidad de trabajo",
      "Muy buena para actividades productivas",
      "Imagen fuerte y confiable",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Según versión de trabajo" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Capacidad", valor: "Trabajo pesado" },
    ],
  },
  {
    id: "f350-2025",
    nombre: "Ford F-350 Super Duty",
    categoria: "Trabajo pesado",
    precio: "Cotizar",
    badge: "Máxima capacidad",
    imagen: "/f-350.jpg",
    descripcion:
      "La solución para clientes que necesitan una herramienta de trabajo todavía más capaz y resistente.",
    dialogo:
      "La F-350 es para quien no puede quedarse corto: más capacidad, más presencia y más respaldo para trabajo pesado.",
    versiones: ["Super Duty"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford F-350 Super Duty. ¿Me ayudas con información completa?",
    caracteristicas: [
      "Pensada para trabajo exigente",
      "Gran percepción de fuerza",
      "Muy útil para clientes de carga y arrastre",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Según configuración" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Capacidad", valor: "Trabajo de máxima exigencia" },
    ],
  },
  {
    id: "transit-custom-2026",
    nombre: "Ford Transit Custom 2026",
    categoria: "Van comercial",
    precio: "$865,600",
    badge: "Versátil",
    imagen: "/transit-custom.jpg",
    descripcion:
      "Van compacta y funcional para clientes de negocio que buscan movilidad práctica y profesional.",
    dialogo:
      "La Transit Custom es ideal para negocio, reparto o servicio, con una imagen moderna y muy profesional.",
    versiones: ["Custom"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Custom 2026. ¿Me compartes información y precio?",
    caracteristicas: [
      "Muy buena para operaciones urbanas",
      "Gran funcionalidad para negocio",
      "Imagen comercial profesional",
    ],
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Van comercial" },
      { etiqueta: "Transmisión", valor: "Automática / según versión" },
      { etiqueta: "Capacidad", valor: "Uso comercial urbano" },
      { etiqueta: "Configuración", valor: "Espacio versátil" },
    ],
  },
  {
    id: "transit-van-2026",
    nombre: "Ford Transit Van 2026",
    categoria: "Van comercial",
    precio: "$1,035,600",
    badge: "Carga",
    imagen: "/transit-van-2026.jpg",
    descripcion:
      "Van enfocada en productividad, operación diaria y presencia profesional de negocio.",
    dialogo:
      "La Transit Van 2026 es perfecta para quien busca una unidad seria para trabajo diario y crecimiento de negocio.",
    versiones: ["Van"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Van 2026. ¿Qué opciones manejas?",
    caracteristicas: [
      "Enfoque en trabajo diario",
      "Gran presencia para negocio",
      "Muy útil para empresas y emprendedores",
    ],
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Van de carga" },
      { etiqueta: "Transmisión", valor: "Según inventario" },
      { etiqueta: "Capacidad", valor: "Uso intensivo de negocio" },
      { etiqueta: "Configuración", valor: "Carga comercial" },
    ],
  },
  {
    id: "transit-pasajeros-2026",
    nombre: "Ford Transit Pasajeros 2026",
    categoria: "Van pasajeros",
    precio: "$1,075,600",
    badge: "Pasajeros",
    imagen: "/transit-pasajeros-2026.jpg",
    descripcion:
      "Pensada para clientes que requieren traslado cómodo, capacidad y una solución profesional.",
    dialogo:
      "Para transporte de personal, turismo o grupos, la Transit Pasajeros 2026 es una unidad muy completa.",
    versiones: ["Pasajeros"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Pasajeros 2026. ¿Qué me puedes compartir?",
    caracteristicas: [
      "Gran funcionalidad para empresas",
      "Buena percepción de comodidad",
      "Muy práctica para transporte organizado",
    ],
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Van de pasajeros" },
      { etiqueta: "Transmisión", valor: "Según versión" },
      { etiqueta: "Capacidad", valor: "Traslado de grupos" },
      { etiqueta: "Confort", valor: "Orientada a transporte organizado" },
    ],
  },
  {
    id: "territory-hibrida-2026",
    nombre: "Ford Territory Híbrida 2026",
    categoria: "SUV",
    precio: "Cotizar",
    badge: "SUV híbrida",
    imagen: "/territory.jpg",
    descripcion:
      "SUV moderna y atractiva para clientes que buscan diseño, espacio y tecnología con enfoque actual.",
    dialogo:
      "La Territory Híbrida es ideal para clientes que quieren una SUV moderna, elegante y con una propuesta más avanzada.",
    versiones: ["Trend", "Titanium"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Territory Híbrida 2026. ¿Me compartes información y versiones?",
    caracteristicas: [
      "SUV con excelente presencia",
      "Muy buena para familia",
      "Gran potencial comercial en redes",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Híbrida según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "Según versión" },
      { etiqueta: "Capacidad", valor: "SUV familiar" },
    ],
  },
  {
    id: "edge-hibrida-2026",
    nombre: "Ford Edge Híbrida 2026",
    categoria: "SUV",
    precio: "$897,000",
    badge: "SUV premium",
    imagen: "/edge.jpg",
    descripcion:
      "SUV elegante y con mucha presencia para clientes que buscan algo más refinado.",
    dialogo:
      "La Edge Híbrida es una SUV ideal para quien quiere confort, imagen y una propuesta premium muy atractiva.",
    versiones: ["Titanium", "ST-Line"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Edge Híbrida 2026. ¿Me compartes más información?",
    caracteristicas: [
      "Diseño elegante",
      "Muy buena para clientes familiares y ejecutivos",
      "Imagen de alto valor",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Híbrida / según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "Según versión" },
      { etiqueta: "Capacidad", valor: "SUV mediana premium" },
    ],
  },
  {
    id: "explorer-2026",
    nombre: "Ford Explorer 2026",
    categoria: "SUV",
    precio: "$1,193,600",
    badge: "SUV grande",
    imagen: "/explorer.jpg",
    descripcion:
      "SUV amplia, familiar y de gran presencia para clientes que quieren espacio y nivel.",
    dialogo:
      "La Explorer 2026 es una SUV para clientes que buscan espacio, presencia y una experiencia más completa.",
    versiones: ["Active", "Platinum"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Explorer 2026. ¿Qué versiones y precio manejas?",
    caracteristicas: [
      "Muy buena para familia",
      "Presencia sólida",
      "Excelente opción de SUV grande",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "AWD / según versión" },
      { etiqueta: "Capacidad", valor: "SUV amplia" },
    ],
  },
  {
    id: "mustang-mache-2026",
    nombre: "Ford Mustang Mach-E 2026",
    categoria: "Eléctrico",
    precio: "$996,500",
    badge: "Eléctrico",
    imagen: "/mustang-mache-2026.jpg",
    descripcion:
      "Crossover eléctrico para clientes que quieren tecnología, diseño y exclusividad.",
    dialogo:
      "Si tu cliente quiere una Ford totalmente diferente, moderna y de alto impacto, el Mach-E 2026 puede ser ideal.",
    versiones: ["Premium", "GT"],
    whatsappTexto:
      "Hola Diego, me interesa el Ford Mustang Mach-E 2026. ¿Me das información completa?",
    caracteristicas: [
      "Enfoque tecnológico",
      "Muy buena imagen comercial",
      "Unidad aspiracional y moderna",
    ],
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Eléctrica" },
      { etiqueta: "Tracción", valor: "Según versión" },
      { etiqueta: "Transmisión", valor: "Sistema eléctrico" },
      { etiqueta: "Capacidad", valor: "Crossover premium" },
    ],
  },
];

function loadSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function loadCatalog() {
  if (typeof window === "undefined") return DEFAULT_CATALOG;
  try {
    const saved = localStorage.getItem(CATALOG_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CATALOG;
  } catch {
    return DEFAULT_CATALOG;
  }
}

function createPlaceholder(name, category = "Ford") {
  const safeName = String(name || "Vehículo Ford").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const safeCategory = String(category || "Ford").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#08111f"/>
        <stop offset="100%" stop-color="#1570ef"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)"/>
    <rect x="70" y="70" width="1060" height="660" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
    <text x="90" y="580" fill="#ffffff" font-size="54" font-family="Arial, Helvetica, sans-serif" font-weight="700">${safeName}</text>
    <text x="90" y="635" fill="#d7e9ff" font-size="28" font-family="Arial, Helvetica, sans-serif">${safeCategory}</text>
    <text x="90" y="690" fill="#b8d7ff" font-size="24" font-family="Arial, Helvetica, sans-serif">Imagen temporal del admin</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function AdminImage({ src, alt, category }) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? createPlaceholder(alt, category) : src}
      alt={alt}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

export default function Admin() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [catalog, setCatalog] = useState(DEFAULT_CATALOG);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem(ADMIN_AUTH_KEY);
    if (auth === "ok") {
      setAuthorized(true);
    }

    setSettings(loadSettings());
    setCatalog(loadCatalog());
  }, []);

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      const text = `
        ${item.nombre}
        ${item.categoria}
        ${item.precio}
        ${item.descripcion}
        ${item.dialogo}
      `.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [catalog, search]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (passwordInput === settings.passwordAdmin) {
      localStorage.setItem(ADMIN_AUTH_KEY, "ok");
      setAuthorized(true);
      setLoginError("");
      setPasswordInput("");
    } else {
      setLoginError("Contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setAuthorized(false);
    setPasswordInput("");
    setLoginError("");
  };

  const saveAll = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    localStorage.setItem(CATALOG_KEY, JSON.stringify(catalog));
    showMessage("Cambios guardados correctamente.");
  };

  const resetAll = () => {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(CATALOG_KEY);
    setSettings(DEFAULT_SETTINGS);
    setCatalog(DEFAULT_CATALOG);
    showMessage("Datos restablecidos.");
  };

  const updateVehicle = (id, field, value) => {
    setCatalog((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const updateVersion = (id, index, value) => {
    setCatalog((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const versions = [...(item.versiones || [])];
        versions[index] = value;
        return { ...item, versiones: versions };
      })
    );
  };

  const updateFeature = (id, index, value) => {
    setCatalog((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const features = [...(item.caracteristicas || [])];
        features[index] = value;
        return { ...item, caracteristicas: features };
      })
    );
  };

  const updateSpec = (id, index, field, value) => {
    setCatalog((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const specs = [...(item.fichaTecnica || [])];
        specs[index] = {
          ...specs[index],
          [field]: value,
        };
        return { ...item, fichaTecnica: specs };
      })
    );
  };

  if (!authorized) {
    return (
      <>
        <div className="loginPage">
          <div className="loginCard">
            <p className="mini">Acceso restringido</p>
            <h1>Panel Admin Ford App</h1>
            <p className="sub">
              Ingresa la contraseña para administrar precios, textos, fichas técnicas e imágenes.
            </p>

            <form onSubmit={handleLogin} className="loginForm">
              <label>Contraseña</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Escribe tu contraseña"
              />

              {loginError ? <div className="errorBox">{loginError}</div> : null}

              <button type="submit" className="btnPrimary">
                Entrar al admin
              </button>

              <a href="/" className="btnSecondary">
                Volver al sitio
              </a>
            </form>
          </div>
        </div>

        <style jsx>{`
          :global(body) {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #08111f;
            color: #fff;
          }

          :global(*) {
            box-sizing: border-box;
          }

          .loginPage {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
            background:
              radial-gradient(circle at top right, rgba(0,118,255,.2), transparent 30%),
              linear-gradient(180deg, #08111f 0%, #102038 100%);
          }

          .loginCard {
            width: min(520px, 100%);
            padding: 28px;
            border-radius: 24px;
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
            box-shadow: 0 25px 60px rgba(0,0,0,.35);
          }

          .mini {
            margin: 0 0 8px;
            color: #7fc0ff;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          h1 {
            margin: 0 0 12px;
            font-size: 34px;
          }

          .sub {
            margin: 0 0 20px;
            color: #d8e6f7;
            line-height: 1.7;
          }

          .loginForm {
            display: grid;
            gap: 14px;
          }

          label {
            font-size: 13px;
            color: #b7d4f3;
            font-weight: 700;
          }

          input {
            width: 100%;
            border: 1px solid rgba(255,255,255,.14);
            background: rgba(255,255,255,.06);
            color: #fff;
            border-radius: 14px;
            padding: 14px;
            outline: none;
            font-size: 15px;
          }

          .btnPrimary,
          .btnSecondary {
            border: none;
            min-height: 48px;
            padding: 0 18px;
            border-radius: 14px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            text-decoration: none;
            cursor: pointer;
          }

          .btnPrimary {
            color: #fff;
            background: linear-gradient(135deg, #1570ef, #3ea6ff);
          }

          .btnSecondary {
            color: #fff;
            background: rgba(255,255,255,.08);
          }

          .errorBox {
            padding: 12px 14px;
            border-radius: 14px;
            background: rgba(239,68,68,.12);
            border: 1px solid rgba(239,68,68,.35);
            color: #ffd7d7;
            font-weight: 700;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="adminPage">
        <div className="container">
          <div className="topbar">
            <div>
              <p className="mini">Panel administrativo</p>
              <h1>Admin Ford App Parral</h1>
              <p className="sub">
                Aquí puedes editar el contenido del sitio y guardar cambios en este navegador.
              </p>
            </div>

            <div className="topActions">
              <a href="/" className="btnSecondary">Ver sitio</a>
              <button onClick={saveAll} className="btnPrimary">Guardar cambios</button>
              <button onClick={handleLogout} className="btnDanger">Cerrar sesión</button>
            </div>
          </div>

          {message ? <div className="alert">{message}</div> : null}

          <section className="panel">
            <h2>Datos del asesor</h2>

            <div className="grid2">
              <div className="field">
                <label>Nombre</label>
                <input
                  value={settings.asesorNombre}
                  onChange={(e) => setSettings({ ...settings, asesorNombre: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Teléfono</label>
                <input
                  value={settings.telefono}
                  onChange={(e) => setSettings({ ...settings, telefono: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Ciudad</label>
                <input
                  value={settings.ciudad}
                  onChange={(e) => setSettings({ ...settings, ciudad: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Slogan</label>
                <input
                  value={settings.slogan}
                  onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                />
              </div>

              <div className="field full">
                <label>Título principal</label>
                <input
                  value={settings.heroTitulo}
                  onChange={(e) => setSettings({ ...settings, heroTitulo: e.target.value })}
                />
              </div>

              <div className="field full">
                <label>Texto principal</label>
                <textarea
                  rows="4"
                  value={settings.heroTexto}
                  onChange={(e) => setSettings({ ...settings, heroTexto: e.target.value })}
                />
              </div>

              <div className="field full">
                <label>Aviso legal</label>
                <input
                  value={settings.avisoLegal}
                  onChange={(e) => setSettings({ ...settings, avisoLegal: e.target.value })}
                />
              </div>

              <div className="field">
                <label>Contraseña admin</label>
                <input
                  value={settings.passwordAdmin}
                  onChange={(e) => setSettings({ ...settings, passwordAdmin: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panelHead">
              <h2>Unidades</h2>
              <button onClick={resetAll} className="btnDanger">Restablecer todo</button>
            </div>

            <input
              className="searchInput"
              type="text"
              placeholder="Buscar unidad para editar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="cardsAdmin">
              {filteredCatalog.map((vehicle) => (
                <div className="vehicleAdmin" key={vehicle.id}>
                  <div className="preview">
                    <AdminImage src={vehicle.imagen} alt={vehicle.nombre} category={vehicle.categoria} />
                  </div>

                  <div className="formVehicle">
                    <div className="grid2">
                      <div className="field">
                        <label>Nombre</label>
                        <input
                          value={vehicle.nombre}
                          onChange={(e) => updateVehicle(vehicle.id, "nombre", e.target.value)}
                        />
                      </div>

                      <div className="field">
                        <label>Categoría</label>
                        <input
                          value={vehicle.categoria}
                          onChange={(e) => updateVehicle(vehicle.id, "categoria", e.target.value)}
                        />
                      </div>

                      <div className="field">
                        <label>Precio</label>
                        <input
                          value={vehicle.precio}
                          onChange={(e) => updateVehicle(vehicle.id, "precio", e.target.value)}
                        />
                      </div>

                      <div className="field">
                        <label>Badge</label>
                        <input
                          value={vehicle.badge}
                          onChange={(e) => updateVehicle(vehicle.id, "badge", e.target.value)}
                        />
                      </div>

                      <div className="field full">
                        <label>Ruta de imagen</label>
                        <input
                          value={vehicle.imagen}
                          onChange={(e) => updateVehicle(vehicle.id, "imagen", e.target.value)}
                        />
                      </div>

                      <div className="field full">
                        <label>Descripción</label>
                        <textarea
                          rows="3"
                          value={vehicle.descripcion}
                          onChange={(e) => updateVehicle(vehicle.id, "descripcion", e.target.value)}
                        />
                      </div>

                      <div className="field full">
                        <label>Diálogo comercial</label>
                        <textarea
                          rows="3"
                          value={vehicle.dialogo}
                          onChange={(e) => updateVehicle(vehicle.id, "dialogo", e.target.value)}
                        />
                      </div>

                      <div className="field full">
                        <label>Texto WhatsApp</label>
                        <textarea
                          rows="3"
                          value={vehicle.whatsappTexto}
                          onChange={(e) => updateVehicle(vehicle.id, "whatsappTexto", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="subPanel">
                      <h3>Versiones</h3>
                      {(vehicle.versiones || []).map((version, index) => (
                        <div className="field" key={index}>
                          <label>Versión {index + 1}</label>
                          <input
                            value={version}
                            onChange={(e) => updateVersion(vehicle.id, index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="subPanel">
                      <h3>Características</h3>
                      {(vehicle.caracteristicas || []).map((item, index) => (
                        <div className="field" key={index}>
                          <label>Característica {index + 1}</label>
                          <input
                            value={item}
                            onChange={(e) => updateFeature(vehicle.id, index, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="subPanel">
                      <h3>Ficha técnica</h3>
                      {(vehicle.fichaTecnica || []).map((item, index) => (
                        <div className="grid2 specRow" key={index}>
                          <div className="field">
                            <label>Etiqueta {index + 1}</label>
                            <input
                              value={item.etiqueta}
                              onChange={(e) => updateSpec(vehicle.id, index, "etiqueta", e.target.value)}
                            />
                          </div>

                          <div className="field">
                            <label>Valor {index + 1}</label>
                            <input
                              value={item.valor}
                              onChange={(e) => updateSpec(vehicle.id, index, "valor", e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bottomActions">
              <button onClick={saveAll} className="btnPrimary">Guardar todo</button>
              <a href="/" className="btnSecondary">Ir al sitio</a>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #08111f;
          color: #fff;
        }

        :global(*) {
          box-sizing: border-box;
        }

        .adminPage {
          min-height: 100vh;
          padding: 32px 0 60px;
          background:
            radial-gradient(circle at top right, rgba(0,118,255,.2), transparent 30%),
            linear-gradient(180deg, #08111f 0%, #102038 100%);
        }

        .container {
          width: min(1220px, calc(100% - 32px));
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .mini {
          margin: 0 0 8px;
          color: #7fc0ff;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        h1 {
          margin: 0 0 10px;
          font-size: 40px;
        }

        .sub {
          margin: 0;
          color: #d8e6f7;
          line-height: 1.7;
          max-width: 760px;
        }

        .panel {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 24px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .panelHead {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
        }

        .grid2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .full {
          grid-column: 1 / -1;
        }

        label {
          font-size: 13px;
          color: #b7d4f3;
          font-weight: 700;
        }

        input,
        textarea {
          width: 100%;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: #fff;
          border-radius: 14px;
          padding: 14px;
          outline: none;
          font-size: 15px;
        }

        textarea {
          resize: vertical;
        }

        .searchInput {
          margin-bottom: 20px;
        }

        .cardsAdmin {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .vehicleAdmin {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 20px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
        }

        .preview {
          border-radius: 18px;
          overflow: hidden;
          background:
            radial-gradient(circle at top right, rgba(62,166,255,0.14), transparent 25%),
            linear-gradient(180deg, #0a1728 0%, #081522 100%);
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.06);
        }

        .preview img {
          width: 100%;
          height: 100%;
          min-height: 240px;
          object-fit: contain;
          object-position: center center;
          display: block;
          padding: 16px;
          filter: drop-shadow(0 16px 28px rgba(0,0,0,0.25));
        }

        .formVehicle {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .subPanel {
          padding: 16px;
          border-radius: 18px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.06);
        }

        .subPanel h3 {
          margin: 0 0 14px;
        }

        .specRow {
          margin-bottom: 12px;
        }

        .topActions,
        .bottomActions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btnPrimary,
        .btnSecondary,
        .btnDanger {
          border: none;
          cursor: pointer;
          min-height: 48px;
          padding: 0 18px;
          border-radius: 14px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          text-decoration: none;
        }

        .btnPrimary {
          color: #fff;
          background: linear-gradient(135deg, #1570ef, #3ea6ff);
        }

        .btnSecondary {
          color: #fff;
          background: rgba(255,255,255,.08);
        }

        .btnDanger {
          color: #fff;
          background: linear-gradient(135deg, #dc2626, #ef4444);
        }

        .alert {
          margin-bottom: 18px;
          padding: 14px 16px;
          border-radius: 16px;
          background: rgba(17,184,87,.14);
          border: 1px solid rgba(17,184,87,.35);
          color: #d7ffe7;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .topbar {
            flex-direction: column;
          }

          .vehicleAdmin,
          .grid2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
