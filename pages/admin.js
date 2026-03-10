import { useEffect, useState } from "react";

const NEGOCIO_BASE = {
  asesorNombre: "Diego Valenzuela",
  telefono: "6272850550",
  ciudad: "Hidalgo del Parral, Chihuahua",
  slogan: "Asesor profesional en vehículos Ford",
  heroTitulo: "Catálogo Ford profesional para clientes de Parral y la región",
  heroTexto:
    "Explora pickups, SUVs, vans y versiones especiales Ford. Cada unidad cuenta con enfoque comercial, versiones y ficha técnica para ayudarte a generar más confianza y más cierres desde WhatsApp.",
};

const CATALOGO_BASE = [
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
      { etiqueta: "Uso ideal", valor: "Ciudad, trabajo ligero y familia" },
      { etiqueta: "Nota", valor: "Confirmar equipamiento exacto según versión" },
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
      { etiqueta: "Uso ideal", valor: "Ahorro de combustible y uso diario" },
      { etiqueta: "Nota", valor: "Verificar ficha exacta por versión disponible" },
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
      { etiqueta: "Uso ideal", valor: "Trabajo, carretera y terracería" },
      { etiqueta: "Nota", valor: "Confirmar desempeño y equipo según versión" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Según versión disponible" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x2 o 4x4" },
      { etiqueta: "Cabina", valor: "Doble cabina" },
      { etiqueta: "Uso ideal", valor: "Trabajo y uso personal" },
      { etiqueta: "Nota", valor: "Especificaciones finales según inventario" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Alto desempeño" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Enfoque off-road performance" },
      { etiqueta: "Uso ideal", valor: "Aventura, imagen y desempeño" },
      { etiqueta: "Nota", valor: "Validar equipamiento exacto de entrega" },
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
      { etiqueta: "Motorización", valor: "Performance según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Off-road de alto desempeño" },
      { etiqueta: "Uso ideal", valor: "Conducción deportiva y aventura" },
      { etiqueta: "Nota", valor: "Confirmar ficha exacta del modelo disponible" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Gasolina / HEV según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x2 o 4x4" },
      { etiqueta: "Cabina", valor: "Doble cabina" },
      { etiqueta: "Uso ideal", valor: "Trabajo, familia y carretera" },
      { etiqueta: "Nota", valor: "Revisar configuración exacta por versión" },
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
      { etiqueta: "Uso ideal", valor: "Ejecutivo, familia y presencia" },
      { etiqueta: "Nota", valor: "Equipamiento sujeto a versión seleccionada" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Según configuración premium" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Interior", valor: "Acabados premium distintivos" },
      { etiqueta: "Uso ideal", valor: "Cliente premium y ejecutivo" },
      { etiqueta: "Nota", valor: "Confirmar detalles exactos al cotizar" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Híbrida según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "Según configuración" },
      { etiqueta: "Interior", valor: "Alta gama" },
      { etiqueta: "Uso ideal", valor: "Cliente premium y tecnología" },
      { etiqueta: "Nota", valor: "Revisar datos exactos en la versión disponible" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "High performance" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Performance/off-road" },
      { etiqueta: "Uso ideal", valor: "Alto impacto y desempeño" },
      { etiqueta: "Nota", valor: "Especificaciones finales según unidad" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Performance" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Preparación de alto desempeño" },
      { etiqueta: "Uso ideal", valor: "Cliente aspiracional premium" },
      { etiqueta: "Nota", valor: "Validar detalles técnicos del inventario" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Gasolina o diésel según versión" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4 según versión" },
      { etiqueta: "Capacidad", valor: "Trabajo pesado" },
      { etiqueta: "Uso ideal", valor: "Carga, arrastre y negocio" },
      { etiqueta: "Nota", valor: "Confirmar capacidad exacta por versión" },
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
      { etiqueta: "Uso ideal", valor: "Negocio y operación intensiva" },
      { etiqueta: "Nota", valor: "Revisar ficha puntual en la cotización" },
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
      { etiqueta: "Uso ideal", valor: "Carga y arrastre pesado" },
      { etiqueta: "Nota", valor: "Confirmar capacidades específicas al cotizar" },
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
    fichaTecnica: [
      { etiqueta: "Configuración", valor: "Chasis para adaptación" },
      { etiqueta: "Transmisión", valor: "Automática según versión" },
      { etiqueta: "Tracción", valor: "Según configuración" },
      { etiqueta: "Aplicación", valor: "Carrozado y uso comercial" },
      { etiqueta: "Uso ideal", valor: "Negocios y adaptaciones" },
      { etiqueta: "Nota", valor: "Validar medidas y capacidades exactas" },
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
    fichaTecnica: [
      { etiqueta: "Configuración", valor: "Chasis adaptable" },
      { etiqueta: "Transmisión", valor: "Según configuración" },
      { etiqueta: "Tracción", valor: "Según versión" },
      { etiqueta: "Aplicación", valor: "Negocio y trabajo especializado" },
      { etiqueta: "Uso ideal", valor: "Proyecto comercial" },
      { etiqueta: "Nota", valor: "Revisar ficha final antes de ofertar" },
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
      { etiqueta: "Uso ideal", valor: "Servicio, reparto y negocio" },
      { etiqueta: "Nota", valor: "Confirmar dimensiones y equipo" },
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
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Van de carga" },
      { etiqueta: "Transmisión", valor: "Automática / según configuración" },
      { etiqueta: "Capacidad", valor: "Carga comercial" },
      { etiqueta: "Configuración", valor: "Amplio espacio interior" },
      { etiqueta: "Uso ideal", valor: "Reparto y logística" },
      { etiqueta: "Nota", valor: "Validar volumen y capacidad exacta" },
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
      { etiqueta: "Uso ideal", valor: "Operación y reparto" },
      { etiqueta: "Nota", valor: "Consultar medidas y peso útil" },
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
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Chasis comercial" },
      { etiqueta: "Transmisión", valor: "Según configuración" },
      { etiqueta: "Aplicación", valor: "Adaptaciones especiales" },
      { etiqueta: "Configuración", valor: "Base para carrozado" },
      { etiqueta: "Uso ideal", valor: "Negocio y servicio especializado" },
      { etiqueta: "Nota", valor: "Verificar longitudes y capacidades" },
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
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Chasis comercial" },
      { etiqueta: "Transmisión", valor: "Según versión" },
      { etiqueta: "Aplicación", valor: "Servicio y adaptaciones" },
      { etiqueta: "Configuración", valor: "Base flexible" },
      { etiqueta: "Uso ideal", valor: "Operación comercial" },
      { etiqueta: "Nota", valor: "Revisar configuración final con cliente" },
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
    fichaTecnica: [
      { etiqueta: "Tipo", valor: "Van de pasajeros" },
      { etiqueta: "Transmisión", valor: "Según configuración" },
      { etiqueta: "Capacidad", valor: "Configuración para pasajeros" },
      { etiqueta: "Confort", valor: "Enfoque en traslado cómodo" },
      { etiqueta: "Uso ideal", valor: "Turismo, personal y transporte" },
      { etiqueta: "Nota", valor: "Confirmar número de plazas disponible" },
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
      { etiqueta: "Uso ideal", valor: "Turismo y personal" },
      { etiqueta: "Nota", valor: "Consultar plazas y equipamiento" },
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
      { etiqueta: "Uso ideal", valor: "Ciudad y familia" },
      { etiqueta: "Nota", valor: "Verificar equipamiento puntual" },
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
      { etiqueta: "Uso ideal", valor: "Familia y ejecutivo" },
      { etiqueta: "Nota", valor: "Confirmar datos con la versión disponible" },
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
      { etiqueta: "Uso ideal", valor: "Familia y carretera" },
      { etiqueta: "Nota", valor: "Revisar plazas y equipo final" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Performance SUV" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "AWD / según versión" },
      { etiqueta: "Capacidad", valor: "SUV deportiva" },
      { etiqueta: "Uso ideal", valor: "Familia con enfoque sport" },
      { etiqueta: "Nota", valor: "Validar ficha exacta de la unidad" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Eléctrica" },
      { etiqueta: "Tracción", valor: "RWD / AWD según versión" },
      { etiqueta: "Transmisión", valor: "Eléctrica de una velocidad" },
      { etiqueta: "Capacidad", valor: "Crossover eléctrico" },
      { etiqueta: "Uso ideal", valor: "Tecnología e innovación" },
      { etiqueta: "Nota", valor: "Confirmar autonomía según versión" },
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
      { etiqueta: "Uso ideal", valor: "Cliente innovador" },
      { etiqueta: "Nota", valor: "Consultar autonomía y carga" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Performance off-road" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Alto desempeño todoterreno" },
      { etiqueta: "Uso ideal", valor: "Aventura y experiencia extrema" },
      { etiqueta: "Nota", valor: "Confirmar equipamiento exacto" },
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
    fichaTecnica: [
      { etiqueta: "Motorización", valor: "Performance off-road" },
      { etiqueta: "Transmisión", valor: "Automática" },
      { etiqueta: "Tracción", valor: "4x4" },
      { etiqueta: "Suspensión", valor: "Preparación Raptor" },
      { etiqueta: "Uso ideal", valor: "Aventura premium" },
      { etiqueta: "Nota", valor: "Revisar datos exactos al apartar" },
    ],
  },
];

function cargarNegocio() {
  if (typeof window === "undefined") return NEGOCIO_BASE;
  try {
    const guardado = localStorage.getItem("fordAppNegocio");
    return guardado ? JSON.parse(guardado) : NEGOCIO_BASE;
  } catch {
    return NEGOCIO_BASE;
  }
}

function cargarCatalogo() {
  if (typeof window === "undefined") return CATALOGO_BASE;
  try {
    const guardado = localStorage.getItem("fordAppCatalogo");
    return guardado ? JSON.parse(guardado) : CATALOGO_BASE;
  } catch {
    return CATALOGO_BASE;
  }
}

export default function Admin() {
  const [negocio, setNegocio] = useState(NEGOCIO_BASE);
  const [catalogo, setCatalogo] = useState(CATALOGO_BASE);
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    setNegocio(cargarNegocio());
    setCatalogo(cargarCatalogo());
  }, []);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 2500);
  };

  const guardarTodo = () => {
    localStorage.setItem("fordAppNegocio", JSON.stringify(negocio));
    localStorage.setItem("fordAppCatalogo", JSON.stringify(catalogo));
    mostrarMensaje("Cambios guardados correctamente.");
  };

  const restablecerTodo = () => {
    localStorage.removeItem("fordAppNegocio");
    localStorage.removeItem("fordAppCatalogo");
    setNegocio(NEGOCIO_BASE);
    setCatalogo(CATALOGO_BASE);
    mostrarMensaje("Datos restablecidos.");
  };

  const actualizarVehiculo = (id, campo, valor) => {
    setCatalogo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [campo]: valor } : item))
    );
  };

  const actualizarVersion = (id, index, valor) => {
    setCatalogo((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nuevas = [...(item.versiones || [])];
        nuevas[index] = valor;
        return { ...item, versiones: nuevas };
      })
    );
  };

  const actualizarCaracteristica = (id, index, valor) => {
    setCatalogo((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nuevas = [...(item.caracteristicas || [])];
        nuevas[index] = valor;
        return { ...item, caracteristicas: nuevas };
      })
    );
  };

  const actualizarFicha = (id, index, campo, valor) => {
    setCatalogo((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nuevaFicha = [...(item.fichaTecnica || [])];
        nuevaFicha[index] = {
          ...nuevaFicha[index],
          [campo]: valor,
        };
        return { ...item, fichaTecnica: nuevaFicha };
      })
    );
  };

  const resultados = catalogo.filter((item) => {
    const texto = `
      ${item.nombre}
      ${item.categoria}
      ${item.precio}
      ${item.descripcion}
      ${item.dialogo}
    `.toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  return (
    <>
      <div className="adminPage">
        <div className="container">
          <div className="topbar">
            <div>
              <p className="mini">Panel administrativo</p>
              <h1>Admin Ford App Parral</h1>
              <p className="sub">
                Aquí puedes editar el contenido del sitio antes de pasar a la seguridad.
              </p>
            </div>

            <div className="accionesTop">
              <a href="/" className="btnSecondary">Ver sitio</a>
              <button onClick={guardarTodo} className="btnPrimary">Guardar cambios</button>
            </div>
          </div>

          {mensaje ? <div className="alerta">{mensaje}</div> : null}

          <section className="panel">
            <h2>Datos del asesor</h2>
            <div className="grid2">
              <div className="campo">
                <label>Nombre</label>
                <input value={negocio.asesorNombre} onChange={(e) => setNegocio({ ...negocio, asesorNombre: e.target.value })} />
              </div>

              <div className="campo">
                <label>Teléfono</label>
                <input value={negocio.telefono} onChange={(e) => setNegocio({ ...negocio, telefono: e.target.value })} />
              </div>

              <div className="campo">
                <label>Ciudad</label>
                <input value={negocio.ciudad} onChange={(e) => setNegocio({ ...negocio, ciudad: e.target.value })} />
              </div>

              <div className="campo">
                <label>Slogan</label>
                <input value={negocio.slogan} onChange={(e) => setNegocio({ ...negocio, slogan: e.target.value })} />
              </div>

              <div className="campo full">
                <label>Título principal</label>
                <input value={negocio.heroTitulo} onChange={(e) => setNegocio({ ...negocio, heroTitulo: e.target.value })} />
              </div>

              <div className="campo full">
                <label>Texto principal</label>
                <textarea rows="4" value={negocio.heroTexto} onChange={(e) => setNegocio({ ...negocio, heroTexto: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panelHead">
              <h2>Unidades</h2>
              <button onClick={restablecerTodo} className="btnDanger">Restablecer todo</button>
            </div>

            <input
              className="searchInput"
              type="text"
              placeholder="Buscar unidad para editar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="cardsAdmin">
              {resultados.map((vehiculo) => (
                <div className="vehiculoAdmin" key={vehiculo.id}>
                  <div className="preview">
                    <img src={vehiculo.imagen} alt={vehiculo.nombre} />
                  </div>

                  <div className="formVehiculo">
                    <div className="grid2">
                      <div className="campo">
                        <label>Nombre</label>
                        <input value={vehiculo.nombre} onChange={(e) => actualizarVehiculo(vehiculo.id, "nombre", e.target.value)} />
                      </div>

                      <div className="campo">
                        <label>Categoría</label>
                        <input value={vehiculo.categoria} onChange={(e) => actualizarVehiculo(vehiculo.id, "categoria", e.target.value)} />
                      </div>

                      <div className="campo">
                        <label>Precio</label>
                        <input value={vehiculo.precio} onChange={(e) => actualizarVehiculo(vehiculo.id, "precio", e.target.value)} />
                      </div>

                      <div className="campo">
                        <label>Badge</label>
                        <input value={vehiculo.badge} onChange={(e) => actualizarVehiculo(vehiculo.id, "badge", e.target.value)} />
                      </div>

                      <div className="campo full">
                        <label>Ruta de imagen</label>
                        <input value={vehiculo.imagen} onChange={(e) => actualizarVehiculo(vehiculo.id, "imagen", e.target.value)} />
                      </div>

                      <div className="campo full">
                        <label>Descripción</label>
                        <textarea rows="3" value={vehiculo.descripcion} onChange={(e) => actualizarVehiculo(vehiculo.id, "descripcion", e.target.value)} />
                      </div>

                      <div className="campo full">
                        <label>Diálogo comercial</label>
                        <textarea rows="3" value={vehiculo.dialogo} onChange={(e) => actualizarVehiculo(vehiculo.id, "dialogo", e.target.value)} />
                      </div>

                      <div className="campo full">
                        <label>Texto WhatsApp</label>
                        <textarea rows="3" value={vehiculo.whatsappTexto} onChange={(e) => actualizarVehiculo(vehiculo.id, "whatsappTexto", e.target.value)} />
                      </div>
                    </div>

                    <div className="subPanel">
                      <h3>Versiones</h3>
                      {(vehiculo.versiones || []).map((version, index) => (
                        <div className="campo" key={index}>
                          <label>Versión {index + 1}</label>
                          <input value={version} onChange={(e) => actualizarVersion(vehiculo.id, index, e.target.value)} />
                        </div>
                      ))}
                    </div>

                    <div className="subPanel">
                      <h3>Características</h3>
                      {(vehiculo.caracteristicas || []).map((item, index) => (
                        <div className="campo" key={index}>
                          <label>Característica {index + 1}</label>
                          <input value={item} onChange={(e) => actualizarCaracteristica(vehiculo.id, index, e.target.value)} />
                        </div>
                      ))}
                    </div>

                    <div className="subPanel">
                      <h3>Ficha técnica</h3>
                      {(vehiculo.fichaTecnica || []).map((dato, index) => (
                        <div className="grid2 fichaRow" key={index}>
                          <div className="campo">
                            <label>Etiqueta {index + 1}</label>
                            <input
                              value={dato.etiqueta}
                              onChange={(e) =>
                                actualizarFicha(vehiculo.id, index, "etiqueta", e.target.value)
                              }
                            />
                          </div>

                          <div className="campo">
                            <label>Valor {index + 1}</label>
                            <input
                              value={dato.valor}
                              onChange={(e) =>
                                actualizarFicha(vehiculo.id, index, "valor", e.target.value)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="accionesBottom">
              <button onClick={guardarTodo} className="btnPrimary">Guardar todo</button>
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

        .campo {
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

        .vehiculoAdmin {
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
          background: #0a1728;
          min-height: 220px;
        }

        .preview img {
          width: 100%;
          height: 100%;
          min-height: 220px;
          object-fit: cover;
          display: block;
        }

        .formVehiculo {
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

        .fichaRow {
          margin-bottom: 12px;
        }

        .accionesTop,
        .accionesBottom {
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

        .alerta {
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

          .vehiculoAdmin,
          .grid2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
