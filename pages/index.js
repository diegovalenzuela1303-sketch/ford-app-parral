import { useMemo, useState } from "react";

const NEGOCIO = {
  asesorNombre: "Diego Valenzuela",
  telefono: "6272850550",
  ciudad: "Hidalgo del Parral, Chihuahua",
  slogan: "Asesor profesional en vehículos Ford",
  heroTitulo: "Catálogo Ford profesional para clientes de Parral y la región",
  heroTexto:
    "Explora pickups, SUVs, vans y versiones especiales Ford. Cada unidad cuenta con un enfoque comercial directo para ayudarte a cerrar más prospectos desde WhatsApp.",
};

const CATALOGO = [
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
  },
  {
    id: "ranger-2026",
    nombre: "Ford Ranger 2026",
    categoria: "Pickup",
    precio: "$763,500",
    badge: "Nueva generación",
    imagen: "/ranger-2026.jpg",
    descripcion:
      "La evolución de la Ranger para clientes que quieren una pickup actual, confiable y con gran presencia.",
    dialogo:
      "Si estás buscando una pickup actualizada, con presencia y gran capacidad, la Ranger 2026 merece que la veas.",
    versiones: ["XLT", "Limited", "Wildtrak"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Ranger 2026. ¿Me compartes precio y versiones disponibles?",
    caracteristicas: [
      "Diseño actualizado",
      "Muy buena para carretera y trabajo",
      "Excelente percepción de valor",
    ],
  },
  {
    id: "ranger-raptor-2025",
    nombre: "Ford Ranger Raptor 2025",
    categoria: "Performance",
    precio: "$1,299,900",
    badge: "Performance",
    imagen: "/ranger-raptor.jpg",
    descripcion:
      "Una pickup extrema, agresiva y aspiracional para clientes que buscan algo fuera de lo normal.",
    dialogo:
      "La Ranger Raptor no es para cualquiera: es para quien quiere presencia, poder y una pickup que impone desde que llega.",
    versiones: ["Raptor"],
    whatsappTexto:
      "Hola Diego, me interesa la Ranger Raptor 2025. ¿Me compartes información completa?",
    caracteristicas: [
      "Imagen deportiva e imponente",
      "Alta atracción visual para redes sociales",
      "Ideal para clientes aspiracionales",
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
      "La F-150 es para quien quiere una pickup seria, poderosa y con una imagen que inspira confianza desde el primer momento.",
    versiones: ["XLT", "Lariat", "Platinum"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford F-150 2025. ¿Qué versiones manejas y cuál conviene más?",
    caracteristicas: [
      "Prestigio de marca",
      "Gran opción para clientes exigentes",
      "Muy fuerte en trabajo y presencia",
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
  },
  {
    id: "lobo-king-ranch-2025",
    nombre: "Ford Lobo King Ranch 2025",
    categoria: "Pickup premium",
    precio: "$1,499,000",
    badge: "King Ranch",
    imagen: "/lobo-king-ranch.jpg",
    descripcion:
      "Versión de mayor personalidad para clientes que valoran lujo, detalle y exclusividad.",
    dialogo:
      "La Lobo King Ranch es ideal para quien no quiere una pickup común, sino una unidad con estilo, lujo y carácter.",
    versiones: ["King Ranch"],
    whatsappTexto:
      "Hola Diego, me interesa la Lobo King Ranch 2025. ¿Me puedes compartir información completa?",
    caracteristicas: [
      "Acabados distintivos",
      "Imagen exclusiva",
      "Gran atractivo visual y comercial",
    ],
  },
  {
    id: "lobo-platinum-plus-hev-2025",
    nombre: "Ford Lobo Platinum Plus HEV 2025",
    categoria: "Pickup premium",
    precio: "Cotizar",
    badge: "HEV",
    imagen: "/lobo-platinum-plus-hev.jpg",
    descripcion:
      "Una pickup premium con enfoque híbrido y una imagen de alta sofisticación.",
    dialogo:
      "Si buscas una pickup premium diferente, tecnológica y con una propuesta más avanzada, esta Lobo HEV destaca muchísimo.",
    versiones: ["Platinum Plus HEV"],
    whatsappTexto:
      "Hola Diego, me interesa la Lobo Platinum Plus HEV 2025. ¿Me das información y disponibilidad?",
    caracteristicas: [
      "Enfoque tecnológico",
      "Imagen premium y moderna",
      "Unidad diferenciada dentro del catálogo",
    ],
  },
  {
    id: "lobo-raptor-2025",
    nombre: "Ford Lobo Raptor 2025",
    categoria: "Performance",
    precio: "$2,424,100",
    badge: "Raptor",
    imagen: "/lobo-raptor.jpg",
    descripcion:
      "La pickup de alto desempeño para quien quiere máxima presencia, deportividad y exclusividad.",
    dialogo:
      "La Lobo Raptor es para clientes que quieren lo más impactante del segmento, con imagen brutal y gran exclusividad.",
    versiones: ["Raptor"],
    whatsappTexto:
      "Hola Diego, me interesa la Lobo Raptor 2025. ¿Me compartes información completa y precio?",
    caracteristicas: [
      "Impacto visual muy alto",
      "Unidad premium-performance",
      "Excelente para contenido aspiracional",
    ],
  },
  {
    id: "lobo-raptor-2026",
    nombre: "Ford Lobo Raptor 2026",
    categoria: "Performance",
    precio: "$2,450,000",
    badge: "Raptor",
    imagen: "/lobo-raptor-2026.jpg",
    descripcion:
      "Una pickup aspiracional de máximo impacto para clientes que quieren algo verdaderamente especial.",
    dialogo:
      "Si tu cliente quiere una pickup que impresione en serio, la Lobo Raptor 2026 se vende sola cuando la ven bien presentada.",
    versiones: ["Raptor"],
    whatsappTexto:
      "Hola Diego, me interesa la Lobo Raptor 2026. ¿Qué me puedes compartir de esta unidad?",
    caracteristicas: [
      "Exclusividad",
      "Diseño muy agresivo",
      "Muy fuerte para atraer prospectos premium",
    ],
  },
  {
    id: "f250-2025",
    nombre: "Ford Super Duty F-250 2025",
    categoria: "Trabajo pesado",
    precio: "$1,522,100",
    badge: "Super Duty",
    imagen: "/f-250.jpg",
    descripcion:
      "La pickup ideal para clientes que necesitan trabajo serio, arrastre y durabilidad real.",
    dialogo:
      "La F-250 es para quien necesita una unidad de trabajo de verdad, con fuerza, respaldo y presencia profesional.",
    versiones: ["XLT", "Lariat"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Super Duty F-250 2025. ¿Me compartes información y versiones?",
    caracteristicas: [
      "Excelente para trabajo intenso",
      "Alta percepción de fortaleza",
      "Muy buena para negocio y flotillas",
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
  },
  {
    id: "super-duty-chasis-2025",
    nombre: "Ford Super Duty Chasis 2025",
    categoria: "Chasis",
    precio: "$1,067,100",
    badge: "Chasis",
    imagen: "/super-duty-chasis.jpg",
    descripcion:
      "Base ideal para conversiones y soluciones de trabajo especializadas.",
    dialogo:
      "Si tu cliente necesita una unidad para adaptar a su negocio, el Super Duty Chasis es una gran herramienta comercial.",
    versiones: ["Chasis"],
    whatsappTexto:
      "Hola Diego, me interesa el Ford Super Duty Chasis 2025. ¿Me compartes opciones y precio?",
    caracteristicas: [
      "Excelente para carrozar",
      "Muy útil para negocios",
      "Unidad enfocada en productividad",
    ],
  },
  {
    id: "super-duty-chasis-2026",
    nombre: "Ford Super Duty Chasis 2026",
    categoria: "Chasis",
    precio: "$1,081,600",
    badge: "Chasis",
    imagen: "/super-duty-chasis-2026.jpg",
    descripcion:
      "Una solución práctica para clientes que requieren una plataforma de trabajo adaptable.",
    dialogo:
      "Para proyectos de carga o unidades especiales, este chasis puede ser justo lo que el cliente necesita.",
    versiones: ["Chasis"],
    whatsappTexto:
      "Hola Diego, me interesa el Ford Super Duty Chasis 2026. ¿Me compartes información?",
    caracteristicas: [
      "Base versátil",
      "Muy buena para negocio",
      "Enfoque totalmente productivo",
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
  },
  {
    id: "transit-van-2025",
    nombre: "Ford Transit Van 2025",
    categoria: "Van comercial",
    precio: "$1,017,300",
    badge: "Carga",
    imagen: "/transit-van.jpg",
    descripcion:
      "Unidad de carga para clientes que necesitan espacio, capacidad y productividad.",
    dialogo:
      "Si el cliente necesita mover mercancía con seriedad, la Transit Van es una opción muy fuerte para negocio.",
    versiones: ["Van"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Van 2025. ¿Me compartes información completa?",
    caracteristicas: [
      "Excelente para reparto",
      "Buena capacidad de carga",
      "Ideal para negocio y flotillas",
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
  },
  {
    id: "transit-chasis-2025",
    nombre: "Ford Transit Chasis 2025",
    categoria: "Chasis",
    precio: "$822,100",
    badge: "Adaptable",
    imagen: "/transit-chasis.jpg",
    descripcion:
      "Base ideal para adaptaciones comerciales o de servicio especial.",
    dialogo:
      "La Transit Chasis es excelente para clientes que necesitan adaptar su unidad exactamente a su operación.",
    versiones: ["Chasis"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Chasis 2025. ¿Me puedes compartir información?",
    caracteristicas: [
      "Muy buena para adaptaciones",
      "Solución comercial flexible",
      "Unidad práctica para empresas",
    ],
  },
  {
    id: "transit-chasis-2026",
    nombre: "Ford Transit Chasis 2026",
    categoria: "Chasis",
    precio: "$838,600",
    badge: "Adaptable",
    imagen: "/transit-chasis-2026.jpg",
    descripcion:
      "Plataforma profesional para soluciones de negocio, carga o servicio.",
    dialogo:
      "Si el cliente necesita una unidad base para negocio, la Transit Chasis 2026 puede ser la respuesta ideal.",
    versiones: ["Chasis"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Chasis 2026. ¿Me compartes opciones?",
    caracteristicas: [
      "Versátil para carrozado",
      "Gran opción para empresas",
      "Enfoque productivo y práctico",
    ],
  },
  {
    id: "transit-pasajeros-2025",
    nombre: "Ford Transit Pasajeros 2025",
    categoria: "Van pasajeros",
    precio: "$1,052,100",
    badge: "Pasajeros",
    imagen: "/transit-pasajeros.jpg",
    descripcion:
      "Excelente opción para transporte de personal, turismo o traslado ejecutivo.",
    dialogo:
      "La Transit Pasajeros es una gran unidad para quien necesita mover personas con comodidad y presencia profesional.",
    versiones: ["Pasajeros"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Transit Pasajeros 2025. ¿Me compartes información?",
    caracteristicas: [
      "Ideal para transporte de personas",
      "Muy útil para negocio",
      "Imagen seria y funcional",
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
  },
  {
    id: "explorer-st-2025",
    nombre: "Ford Explorer ST 2025",
    categoria: "Performance",
    precio: "Cotizar",
    badge: "ST",
    imagen: "/explorer-st.jpg",
    descripcion:
      "SUV deportiva para clientes que quieren espacio, diseño y personalidad más agresiva.",
    dialogo:
      "La Explorer ST mezcla el espacio de una SUV con una imagen mucho más deportiva y atractiva.",
    versiones: ["ST"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Explorer ST 2025. ¿Me compartes información?",
    caracteristicas: [
      "SUV con enfoque deportivo",
      "Muy atractiva visualmente",
      "Ideal para clientes que quieren diferenciarse",
    ],
  },
  {
    id: "mustang-mache-2025",
    nombre: "Ford Mustang Mach-E 2025",
    categoria: "Eléctrico",
    precio: "$989,000",
    badge: "Eléctrico",
    imagen: "/mustang-mache.jpg",
    descripcion:
      "Una propuesta eléctrica y moderna con imagen fuerte para clientes innovadores.",
    dialogo:
      "El Mustang Mach-E es para quien quiere algo distinto, moderno y con una identidad muy marcada.",
    versiones: ["Premium", "GT"],
    whatsappTexto:
      "Hola Diego, me interesa el Ford Mustang Mach-E 2025. ¿Me compartes información?",
    caracteristicas: [
      "Propuesta eléctrica",
      "Diseño moderno",
      "Muy llamativo en contenido digital",
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
  },
  {
    id: "bronco-raptor-2025",
    nombre: "Ford Bronco Raptor 2025",
    categoria: "Performance",
    precio: "$2,242,478",
    badge: "Raptor",
    imagen: "/bronco-raptor.jpg",
    descripcion:
      "Una unidad extrema para clientes que quieren aventura, diseño agresivo y una personalidad única.",
    dialogo:
      "La Bronco Raptor no pasa desapercibida: es una unidad para clientes que quieren algo totalmente fuera de serie.",
    versiones: ["Raptor"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Bronco Raptor 2025. ¿Me compartes información?",
    caracteristicas: [
      "Imagen brutal",
      "Muy aspiracional",
      "Excelente para atraer atención",
    ],
  },
  {
    id: "bronco-raptor-2026",
    nombre: "Ford Bronco Raptor 2026",
    categoria: "Performance",
    precio: "$2,140,500",
    badge: "Raptor",
    imagen: "/bronco-raptor-2026.jpg",
    descripcion:
      "Pensada para clientes que quieren aventura, presencia y una unidad muy especial.",
    dialogo:
      "Si buscas una unidad que genere conversación y deseo, la Bronco Raptor 2026 es de las más fuertes del catálogo.",
    versiones: ["Raptor"],
    whatsappTexto:
      "Hola Diego, me interesa la Ford Bronco Raptor 2026. ¿Qué me puedes compartir?",
    caracteristicas: [
      "Muy alta atracción visual",
      "Gran personalidad",
      "Excelente para marketing aspiracional",
    ],
  },
];

function formatearWhatsApp(numero, texto) {
  const limpio = String(numero).replace(/\D/g, "");
  return `https://wa.me/52${limpio}?text=${encodeURIComponent(texto)}`;
}

function formatearLlamada(numero) {
  return `tel:+52${String(numero).replace(/\D/g, "")}`;
}

function crearPlaceholder(nombre) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0b1b31"/>
          <stop offset="100%" stop-color="#1570ef"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="980" cy="130" r="180" fill="rgba(255,255,255,0.08)"/>
      <circle cx="180" cy="650" r="220" fill="rgba(255,255,255,0.06)"/>
      <text x="70" y="330" fill="#ffffff" font-size="66" font-family="Arial, Helvetica, sans-serif" font-weight="700">
        ${nombre}
      </text>
      <text x="70" y="410" fill="#cfe3ff" font-size="30" font-family="Arial, Helvetica, sans-serif">
        Imagen pendiente por cargar
      </text>
      <text x="70" y="470" fill="#cfe3ff" font-size="24" font-family="Arial, Helvetica, sans-serif">
        Ford App Parral - Diego Valenzuela
      </text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function ImagenVehiculo({ src, alt }) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? crearPlaceholder(alt) : src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
}

export default function Home() {
  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const categorias = useMemo(() => {
    return ["Todos", ...Array.from(new Set(CATALOGO.map((item) => item.categoria)))];
  }, []);

  const resultados = useMemo(() => {
    return CATALOGO.filter((item) => {
      const coincideCategoria =
        categoria === "Todos" ? true : item.categoria === categoria;

      const texto = `
        ${item.nombre}
        ${item.categoria}
        ${item.descripcion}
        ${item.dialogo}
        ${item.versiones.join(" ")}
        ${item.caracteristicas.join(" ")}
      `.toLowerCase();

      const coincideBusqueda = texto.includes(busqueda.toLowerCase());

      return coincideCategoria && coincideBusqueda;
    });
  }, [categoria, busqueda]);

  const linkWhatsappGeneral = formatearWhatsApp(
    NEGOCIO.telefono,
    `Hola ${NEGOCIO.asesorNombre}, vi tu catálogo Ford y quiero información sobre una unidad.`
  );

  const linkLlamada = formatearLlamada(NEGOCIO.telefono);

  return (
    <>
      <div className="app">
        <header className="topbar">
          <div className="container topbarInner">
            <div className="brand">
              <div className="logo">F</div>
              <div>
                <p className="brandMini">Ford App Parral</p>
                <h1>{NEGOCIO.asesorNombre}</h1>
              </div>
            </div>

            <nav className="nav">
              <a href="#catalogo">Catálogo</a>
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
              <span className="eyebrow">Catálogo Ford profesional</span>
              <h2>{NEGOCIO.heroTitulo}</h2>
              <p>{NEGOCIO.heroTexto}</p>

              <div className="heroButtons">
                <a
                  href={linkWhatsappGeneral}
                  target="_blank"
                  rel="noreferrer"
                  className="btnPrimary"
                >
                  Cotizar por WhatsApp
                </a>

                <a href={linkLlamada} className="btnSecondary">
                  Llamar ahora
                </a>
              </div>

              <div className="statsInline">
                <div>
                  <strong>{CATALOGO.length}</strong>
                  <span>Unidades / versiones destacadas</span>
                </div>
                <div>
                  <strong>{categorias.length - 1}</strong>
                  <span>Categorías</span>
                </div>
                <div>
                  <strong>1 a 1</strong>
                  <span>Atención directa</span>
                </div>
              </div>
            </div>

            <div className="heroCard">
              <div className="heroImageWrap">
                <img src="/diego-asesor.jpg" alt={NEGOCIO.asesorNombre} />
              </div>

              <div className="heroCardInfo">
                <p className="miniLabel">Asesor</p>
                <h3>{NEGOCIO.asesorNombre}</h3>
                <p>{NEGOCIO.slogan}</p>
                <p>{NEGOCIO.ciudad}</p>

                <div className="heroCtas">
                  <a
                    href={linkWhatsappGeneral}
                    target="_blank"
                    rel="noreferrer"
                    className="btnPrimary full"
                  >
                    Hablar por WhatsApp
                  </a>
                  <a href={linkLlamada} className="btnSecondary full">
                    Llamar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="filtrosSection" id="catalogo">
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">Inventario comercial</span>
                <h2>Catálogo completo de unidades Ford</h2>
                <p>
                  Busca por nombre, versión o tipo de unidad. Cada tarjeta ya trae
                  un diálogo comercial para ayudarte a resaltar mejor la unidad
                  ante el cliente.
                </p>
              </div>
            </div>

            <div className="toolsBar">
              <input
                type="text"
                placeholder="Buscar unidad, versión o categoría..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="searchInput"
              />

              <div className="filtros">
                {categorias.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategoria(item)}
                    className={categoria === item ? "filtro active" : "filtro"}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="catalogSummary">
              Mostrando <strong>{resultados.length}</strong> unidades
            </div>

            <div className="gridVehiculos">
              {resultados.map((vehiculo) => {
                const linkUnidad = formatearWhatsApp(
                  NEGOCIO.telefono,
                  vehiculo.whatsappTexto
                );

                return (
                  <article key={vehiculo.id} className="cardVehiculo">
                    <div className="imgWrap">
                      <ImagenVehiculo src={vehiculo.imagen} alt={vehiculo.nombre} />
                      <span className="badge">{vehiculo.badge}</span>
                    </div>

                    <div className="cardContent">
                      <div className="cardTop">
                        <p className="categoria">{vehiculo.categoria}</p>
                        <span className="precio">{vehiculo.precio}</span>
                      </div>

                      <h3>{vehiculo.nombre}</h3>
                      <p className="descripcion">{vehiculo.descripcion}</p>

                      <div className="versiones">
                        {vehiculo.versiones.map((version) => (
                          <span key={version}>{version}</span>
                        ))}
                      </div>

                      <div className="dialogoBox">
                        <span className="dialogoLabel">Diálogo sugerido</span>
                        <p>{vehiculo.dialogo}</p>
                      </div>

                      <ul className="features">
                        {vehiculo.caracteristicas.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      <div className="acciones">
                        <a
                          href={linkUnidad}
                          target="_blank"
                          rel="noreferrer"
                          className="btnPrimary"
                        >
                          Solicitar información
                        </a>
                        <a href={linkLlamada} className="btnSecondary">
                          Llamar
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ventajas">
          <div className="container ventajasGrid">
            <div className="ventajaCard">
              <h3>Catálogo más completo</h3>
              <p>
                Ahora tu página luce más sólida y transmite que manejas un portafolio
                amplio y profesional.
              </p>
            </div>
            <div className="ventajaCard">
              <h3>Diálogo por unidad</h3>
              <p>
                Cada vehículo ya incluye una forma de presentarlo mejor y provocar
                interés del cliente.
              </p>
            </div>
            <div className="ventajaCard">
              <h3>Más enfoque comercial</h3>
              <p>
                Todo está pensado para llevar al prospecto a WhatsApp o llamada lo
                más rápido posible.
              </p>
            </div>
          </div>
        </section>

        <section id="asesor" className="asesorSection">
          <div className="container asesorGrid">
            <div className="asesorFotoBox">
              <img
                src="/diego-asesor.jpg"
                alt={`Asesor ${NEGOCIO.asesorNombre}`}
                className="asesorFoto"
              />
            </div>

            <div className="asesorInfo">
              <span className="eyebrow">Tu asesor</span>
              <h2>{NEGOCIO.asesorNombre}</h2>
              <p className="asesorSub">{NEGOCIO.slogan}</p>
              <p>
                Atención enfocada en ayudarte a presentar mejor cada unidad, generar
                más confianza y convertir más prospectos desde una imagen seria y
                profesional.
              </p>

              <div className="asesorPuntos">
                <div className="point">Atención directa</div>
                <div className="point">Respuesta rápida</div>
                <div className="point">Cierre por WhatsApp</div>
                <div className="point">Imagen profesional</div>
              </div>

              <div className="heroButtons">
                <a
                  href={linkWhatsappGeneral}
                  target="_blank"
                  rel="noreferrer"
                  className="btnPrimary"
                >
                  Contactar a Diego
                </a>
                <a href={linkLlamada} className="btnSecondary">
                  Llamar
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="contacto">
          <div className="container contactoBox">
            <div>
              <span className="eyebrow">Contacto directo</span>
              <h2>Convierte más visitas en prospectos</h2>
              <p>
                Lleva al cliente directo a conversación contigo. Esa parte hace una
                gran diferencia para cerrar más rápido.
              </p>
            </div>

            <div className="contactActions">
              <a
                href={linkWhatsappGeneral}
                target="_blank"
                rel="noreferrer"
                className="btnPrimary"
              >
                WhatsApp: {NEGOCIO.telefono}
              </a>
              <a href={linkLlamada} className="btnSecondary">
                Llamar ahora
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footerInner">
            <div>
              <strong>{NEGOCIO.asesorNombre}</strong>
              <p>{NEGOCIO.slogan}</p>
            </div>

            <div className="footerLinks">
              <a href="#catalogo">Catálogo</a>
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
          width: min(1280px, calc(100% - 32px));
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

        .statsInline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 24px;
        }

        .statsInline div {
          padding: 16px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .statsInline strong {
          display: block;
          font-size: 24px;
          margin-bottom: 6px;
        }

        .statsInline span {
          color: #dbe9f8;
          font-size: 14px;
          line-height: 1.5;
        }

        .heroCard {
          overflow: hidden;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }

        .heroImageWrap img {
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

        .heroCtas {
          display: grid;
          gap: 10px;
          margin-top: 14px;
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
        }

        .filtrosSection {
          padding: 20px 0 52px;
        }

        .sectionHead h2 {
          margin: 0 0 10px;
          font-size: 34px;
        }

        .sectionHead p {
          margin: 0;
          color: #dbe9f8;
          max-width: 760px;
          line-height: 1.7;
        }

        .toolsBar {
          margin-top: 22px;
          display: grid;
          gap: 16px;
        }

        .searchInput {
          width: 100%;
          min-height: 54px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          padding: 0 18px;
          font-size: 15px;
          outline: none;
        }

        .searchInput::placeholder {
          color: #9fbbd7;
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

        .catalogSummary {
          margin: 18px 0 0;
          color: #dbe9f8;
        }

        .gridVehiculos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
          margin-top: 22px;
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
          height: 300px;
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
          transform: scale(1.03);
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

        .cardTop {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }

        .categoria {
          margin: 0;
          color: #7fc0ff;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .precio {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          background: rgba(21, 112, 239, 0.14);
          color: #dfeeff;
          font-size: 13px;
          font-weight: 700;
        }

        .cardContent h3 {
          margin: 12px 0 10px;
          font-size: 28px;
          line-height: 1.15;
        }

        .descripcion {
          color: #dbe9f8;
          line-height: 1.7;
          margin: 0 0 16px;
        }

        .versiones {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }

        .versiones span {
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: #dbe9f8;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .dialogoBox {
          padding: 16px;
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            rgba(21, 112, 239, 0.16),
            rgba(62, 166, 255, 0.08)
          );
          border: 1px solid rgba(127, 192, 255, 0.18);
          margin-bottom: 18px;
        }

        .dialogoLabel {
          display: block;
          margin-bottom: 8px;
          color: #7fc0ff;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .dialogoBox p {
          margin: 0;
          color: #eef5ff;
          line-height: 1.7;
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
          background: linear-gradient(
            135deg,
            rgba(21, 112, 239, 0.18),
            rgba(62, 166, 255, 0.08)
          );
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
          .ventajasGrid,
          .contactoBox,
          .statsInline {
            grid-template-columns: 1fr;
          }

          .topbarInner,
          .footerInner {
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

          .heroImageWrap img {
            height: 280px;
          }

          .asesorFoto {
            min-height: 300px;
          }

          .cardTop {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
