const vehicles = [
  {
    id: 1,
    nombre: "Ford Ranger",
    categoria: "Pickup",
    imagen: "/img/ranger.jpg",
    descripcion: "Pickup versátil ideal para trabajo y uso diario.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.3L EcoBoost",
      transmision: "Automática de 10 velocidades",
      potencia: "270 hp aprox.",
      traccion: "4x2 / 4x4 según versión",
      uso: "Trabajo y uso personal"
    }
  },
  {
    id: 2,
    nombre: "Ford Ranger Raptor",
    categoria: "Pickup",
    imagen: "/img/ranger-raptor.jpg",
    descripcion: "Pickup de alto desempeño diseñada para aventura extrema.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "3.0L EcoBoost V6",
      transmision: "Automática de 10 velocidades",
      potencia: "392 hp aprox.",
      traccion: "4x4",
      uso: "Aventura y alto desempeño"
    }
  },
  {
    id: 3,
    nombre: "Ford F-150",
    categoria: "Pickup",
    imagen: "/img/f150.jpg",
    descripcion: "La pickup más icónica de Ford, potencia y tecnología.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "V6 / V8 según versión",
      transmision: "Automática",
      potencia: "Potencia según versión",
      traccion: "4x2 / 4x4",
      uso: "Trabajo, negocio y uso premium"
    }
  },
  {
    id: 4,
    nombre: "Ford F-250",
    categoria: "Pickup",
    imagen: "/img/f250.jpg",
    descripcion: "Pickup de trabajo pesado con gran capacidad de carga.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel según versión",
      transmision: "Automática",
      potencia: "Trabajo pesado",
      traccion: "4x2 / 4x4",
      uso: "Carga y operación profesional"
    }
  },
  {
    id: 5,
    nombre: "Ford F-350",
    categoria: "Pickup",
    imagen: "/img/f350.jpg",
    descripcion: "Potencia extrema para trabajo profesional.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel según versión",
      transmision: "Automática",
      potencia: "Trabajo extremo",
      traccion: "4x2 / 4x4",
      uso: "Trabajo rudo y flotillas"
    }
  },
  {
    id: 6,
    nombre: "Ford Maverick",
    categoria: "Pickup",
    imagen: "/img/maverick.jpg",
    descripcion: "Pickup compacta eficiente y práctica.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.0L Turbo / híbrido según versión",
      transmision: "Automática",
      potencia: "Potencia según versión",
      traccion: "Delantera / AWD",
      uso: "Ciudad, negocio y uso diario"
    }
  },
  {
    id: 7,
    nombre: "Ford Territory",
    categoria: "SUV",
    imagen: "/img/territory.jpg",
    descripcion: "SUV familiar con gran espacio y tecnología.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "1.8L Turbo",
      transmision: "Automática",
      potencia: "Potencia según versión",
      traccion: "Delantera",
      uso: "Familia y ciudad"
    }
  },
  {
    id: 8,
    nombre: "Ford Escape",
    categoria: "SUV",
    imagen: "/img/escape.jpg",
    descripcion: "SUV moderna ideal para ciudad y carretera.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / híbrido según versión",
      transmision: "Automática",
      potencia: "Potencia según versión",
      traccion: "FWD / AWD",
      uso: "Familia y uso diario"
    }
  },
  {
    id: 9,
    nombre: "Ford Edge",
    categoria: "SUV",
    imagen: "/img/edge.jpg",
    descripcion: "SUV premium con gran desempeño.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Turbo según versión",
      transmision: "Automática",
      potencia: "Potencia media-alta",
      traccion: "AWD según versión",
      uso: "Familia y viaje"
    }
  },
  {
    id: 10,
    nombre: "Ford Explorer",
    categoria: "SUV",
    imagen: "/img/explorer.jpg",
    descripcion: "SUV espaciosa perfecta para familia y viajes.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Turbo según versión",
      transmision: "Automática",
      potencia: "Potencia alta",
      traccion: "RWD / AWD",
      uso: "Familia y carretera"
    }
  },
  {
    id: 11,
    nombre: "Ford Expedition",
    categoria: "SUV",
    imagen: "/img/expedition.jpg",
    descripcion: "SUV grande con lujo, espacio y potencia.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "3.5L EcoBoost",
      transmision: "Automática de 10 velocidades",
      potencia: "Potencia alta",
      traccion: "4x2 / 4x4",
      uso: "Familia grande y viaje"
    }
  },
  {
    id: 12,
    nombre: "Ford Bronco",
    categoria: "SUV",
    imagen: "/img/bronco.jpg",
    descripcion: "Legendario todoterreno diseñado para aventura.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Turbo según versión",
      transmision: "Manual / automática",
      potencia: "Potencia alta",
      traccion: "4x4",
      uso: "Aventura y off-road"
    }
  },
  {
    id: 13,
    nombre: "Ford Bronco Sport",
    categoria: "SUV",
    imagen: "/img/bronco-sport.jpg",
    descripcion: "SUV compacta con espíritu aventurero.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "1.5L / 2.0L EcoBoost",
      transmision: "Automática",
      potencia: "Potencia según versión",
      traccion: "AWD",
      uso: "Ciudad y aventura"
    }
  },
  {
    id: 14,
    nombre: "Ford Mustang",
    categoria: "Deportivo",
    imagen: "/img/mustang.jpg",
    descripcion: "Deportivo icónico con alto desempeño.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.3L EcoBoost / V8 según versión",
      transmision: "Manual / automática",
      potencia: "Potencia alta",
      traccion: "Trasera",
      uso: "Personal y deportivo"
    }
  },
  {
    id: 15,
    nombre: "Ford Mustang GT",
    categoria: "Deportivo",
    imagen: "/img/mustang-gt.jpg",
    descripcion: "Muscle car con motor V8 y potencia pura.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "5.0L V8",
      transmision: "Manual / automática",
      potencia: "480 hp aprox.",
      traccion: "Trasera",
      uso: "Desempeño y pasión automotriz"
    }
  },
  {
    id: 16,
    nombre: "Ford Mustang Dark Horse",
    categoria: "Deportivo",
    imagen: "/img/mustang-darkhorse.jpg",
    descripcion: "Mustang de alto rendimiento para pista.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "5.0L V8",
      transmision: "Manual / automática",
      potencia: "500 hp aprox.",
      traccion: "Trasera",
      uso: "Alto desempeño"
    }
  },
  {
    id: 17,
    nombre: "Ford Transit Cargo",
    categoria: "Comercial",
    imagen: "/img/transit-cargo.jpg",
    descripcion: "Van comercial ideal para transporte de carga.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel según versión",
      transmision: "Automática",
      potencia: "Trabajo comercial",
      traccion: "Trasera",
      uso: "Carga y reparto"
    }
  },
  {
    id: 18,
    nombre: "Ford Transit Pasajeros",
    categoria: "Comercial",
    imagen: "/img/transit-pasajeros.jpg",
    descripcion: "Van para transporte de pasajeros.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel según versión",
      transmision: "Automática",
      potencia: "Trabajo comercial",
      traccion: "Trasera",
      uso: "Pasajeros y turismo"
    }
  },
  {
    id: 19,
    nombre: "Ford Transit Chasis",
    categoria: "Comercial",
    imagen: "/img/transit-chasis.jpg",
    descripcion: "Plataforma ideal para conversiones comerciales.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel según versión",
      transmision: "Automática",
      potencia: "Uso comercial",
      traccion: "Trasera",
      uso: "Conversión y negocio"
    }
  },
  {
    id: 20,
    nombre: "Ford Transit Custom",
    categoria: "Comercial",
    imagen: "/img/transit-custom.jpg",
    descripcion: "Van mediana para negocio y transporte.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Turbo diésel / gasolina según versión",
      transmision: "Manual / automática",
      potencia: "Uso comercial",
      traccion: "Delantera / trasera según versión",
      uso: "Negocio y reparto"
    }
  },
  {
    id: 21,
    nombre: "Ford Super Duty F-450",
    categoria: "Pickup",
    imagen: "/img/f450.jpg",
    descripcion: "Camioneta de trabajo extremo.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel",
      transmision: "Automática",
      potencia: "Trabajo pesado",
      traccion: "4x2 / 4x4",
      uso: "Industria y carga"
    }
  },
  {
    id: 22,
    nombre: "Ford Super Duty F-550",
    categoria: "Pickup",
    imagen: "/img/f550.jpg",
    descripcion: "Plataforma pesada para trabajo industrial.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Gasolina / diésel",
      transmision: "Automática",
      potencia: "Trabajo industrial",
      traccion: "4x2 / 4x4",
      uso: "Carga extrema"
    }
  },
  {
    id: 23,
    nombre: "Ford Ranger XL",
    categoria: "Pickup",
    imagen: "/img/ranger-xl.jpg",
    descripcion: "Versión de trabajo robusta y confiable.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.3L EcoBoost",
      transmision: "Automática",
      potencia: "Potencia funcional",
      traccion: "4x2 / 4x4",
      uso: "Trabajo"
    }
  },
  {
    id: 24,
    nombre: "Ford Ranger XLT",
    categoria: "Pickup",
    imagen: "/img/ranger-xlt.jpg",
    descripcion: "Equilibrio perfecto entre trabajo y confort.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.3L EcoBoost",
      transmision: "Automática",
      potencia: "Potencia funcional",
      traccion: "4x2 / 4x4",
      uso: "Trabajo y familia"
    }
  },
  {
    id: 25,
    nombre: "Ford Ranger Limited",
    categoria: "Pickup",
    imagen: "/img/ranger-limited.jpg",
    descripcion: "Versión premium de la Ranger.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.3L EcoBoost",
      transmision: "Automática",
      potencia: "Potencia alta",
      traccion: "4x4 según versión",
      uso: "Trabajo y confort"
    }
  },
  {
    id: 26,
    nombre: "Ford F-150 Raptor",
    categoria: "Pickup",
    imagen: "/img/f150-raptor.jpg",
    descripcion: "Pickup off-road de alto desempeño.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "V6 High Output",
      transmision: "Automática de 10 velocidades",
      potencia: "Potencia alta",
      traccion: "4x4",
      uso: "Aventura extrema"
    }
  },
  {
    id: 27,
    nombre: "Ford F-150 Platinum",
    categoria: "Pickup",
    imagen: "/img/f150-platinum.jpg",
    descripcion: "Lujo y potencia en una pickup premium.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "V6 / híbrido según versión",
      transmision: "Automática",
      potencia: "Potencia alta",
      traccion: "4x4 según versión",
      uso: "Negocio y uso premium"
    }
  },
  {
    id: 28,
    nombre: "Ford Escape Hybrid",
    categoria: "SUV",
    imagen: "/img/escape-hybrid.jpg",
    descripcion: "SUV híbrida eficiente y moderna.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Híbrido",
      transmision: "eCVT",
      potencia: "Eficiencia elevada",
      traccion: "FWD / AWD",
      uso: "Ciudad y familia"
    }
  },
  {
    id: 29,
    nombre: "Ford Explorer ST",
    categoria: "SUV",
    imagen: "/img/explorer-st.jpg",
    descripcion: "SUV deportiva con gran potencia.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "3.0L EcoBoost",
      transmision: "Automática",
      potencia: "400 hp aprox.",
      traccion: "AWD",
      uso: "Familia y desempeño"
    }
  },
  {
    id: 30,
    nombre: "Ford Bronco Wildtrak",
    categoria: "SUV",
    imagen: "/img/bronco-wildtrak.jpg",
    descripcion: "Versión off-road avanzada del Bronco.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.7L EcoBoost",
      transmision: "Automática",
      potencia: "330 hp aprox.",
      traccion: "4x4",
      uso: "Off-road"
    }
  },
  {
    id: 31,
    nombre: "Ford Maverick Tremor",
    categoria: "Pickup",
    imagen: "/img/maverick-tremor.jpg",
    descripcion: "Pickup compacta con capacidades off-road.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "2.0L Turbo",
      transmision: "Automática",
      potencia: "Potencia funcional",
      traccion: "AWD",
      uso: "Ciudad y aventura"
    }
  },
  {
    id: 32,
    nombre: "Ford Mustang Mach-E",
    categoria: "SUV",
    imagen: "/img/mach-e.jpg",
    descripcion: "SUV eléctrica con espíritu deportivo.",
    precio: "Cotiza con asesor",
    ficha: {
      motor: "Eléctrico",
      transmision: "Automática",
      potencia: "Potencia según versión",
      traccion: "RWD / AWD",
      uso: "Personal y tecnología"
    }
  }
]

export default vehicles
{
id:4,
nombre:"Ford F-250",
categoria:"Pickup",
imagen:"/img/f250.jpg",
descripcion:"Pickup de trabajo pesado con gran capacidad de carga.",
precio:"Cotiza con asesor"
},

{
id:5,
nombre:"Ford F-350",
categoria:"Pickup",
imagen:"/img/f350.jpg",
descripcion:"Potencia extrema para trabajo profesional.",
precio:"Cotiza con asesor"
},

{
id:6,
nombre:"Ford Maverick",
categoria:"Pickup",
imagen:"/img/maverick.jpg",
descripcion:"Pickup compacta eficiente y práctica.",
precio:"Cotiza con asesor"
},

{
id:7,
nombre:"Ford Territory",
categoria:"SUV",
imagen:"/img/territory.jpg",
descripcion:"SUV familiar con gran espacio y tecnología.",
precio:"Cotiza con asesor"
},

{
id:8,
nombre:"Ford Escape",
categoria:"SUV",
imagen:"/img/escape.jpg",
descripcion:"SUV moderna ideal para ciudad y carretera.",
precio:"Cotiza con asesor"
},

{
id:9,
nombre:"Ford Edge",
categoria:"SUV",
imagen:"/img/edge.jpg",
descripcion:"SUV premium con gran desempeño.",
precio:"Cotiza con asesor"
},

{
id:10,
nombre:"Ford Explorer",
categoria:"SUV",
imagen:"/img/explorer.jpg",
descripcion:"SUV espaciosa perfecta para familia y viajes.",
precio:"Cotiza con asesor"
},

{
id:11,
nombre:"Ford Expedition",
categoria:"SUV",
imagen:"/img/expedition.jpg",
descripcion:"SUV grande con lujo, espacio y potencia.",
precio:"Cotiza con asesor"
},

{
id:12,
nombre:"Ford Bronco",
categoria:"SUV",
imagen:"/img/bronco.jpg",
descripcion:"Legendario todoterreno diseñado para aventura.",
precio:"Cotiza con asesor"
},

{
id:13,
nombre:"Ford Bronco Sport",
categoria:"SUV",
imagen:"/img/bronco-sport.jpg",
descripcion:"SUV compacta con espíritu aventurero.",
precio:"Cotiza con asesor"
},

{
id:14,
nombre:"Ford Mustang",
categoria:"Deportivo",
imagen:"/img/mustang.jpg",
descripcion:"Deportivo icónico con alto desempeño.",
precio:"Cotiza con asesor"
},

{
id:15,
nombre:"Ford Mustang GT",
categoria:"Deportivo",
imagen:"/img/mustang-gt.jpg",
descripcion:"Muscle car con motor V8 y potencia pura.",
precio:"Cotiza con asesor"
},

{
id:16,
nombre:"Ford Mustang Dark Horse",
categoria:"Deportivo",
imagen:"/img/mustang-darkhorse.jpg",
descripcion:"Mustang de alto rendimiento para pista.",
precio:"Cotiza con asesor"
},

{
id:17,
nombre:"Ford Transit Cargo",
categoria:"Comercial",
imagen:"/img/transit-cargo.jpg",
descripcion:"Van comercial ideal para transporte de carga.",
precio:"Cotiza con asesor"
},

{
id:18,
nombre:"Ford Transit Pasajeros",
categoria:"Comercial",
imagen:"/img/transit-pasajeros.jpg",
descripcion:"Van para transporte de pasajeros.",
precio:"Cotiza con asesor"
},

{
id:19,
nombre:"Ford Transit Chasis",
categoria:"Comercial",
imagen:"/img/transit-chasis.jpg",
descripcion:"Plataforma ideal para conversiones comerciales.",
precio:"Cotiza con asesor"
},

{
id:20,
nombre:"Ford Transit Custom",
categoria:"Comercial",
imagen:"/img/transit-custom.jpg",
descripcion:"Van mediana para negocio y transporte.",
precio:"Cotiza con asesor"
},

{
id:21,
nombre:"Ford Super Duty F-450",
categoria:"Pickup",
imagen:"/img/f450.jpg",
descripcion:"Camioneta de trabajo extremo.",
precio:"Cotiza con asesor"
},

{
id:22,
nombre:"Ford Super Duty F-550",
categoria:"Pickup",
imagen:"/img/f550.jpg",
descripcion:"Plataforma pesada para trabajo industrial.",
precio:"Cotiza con asesor"
},

{
id:23,
nombre:"Ford Ranger XL",
categoria:"Pickup",
imagen:"/img/ranger-xl.jpg",
descripcion:"Versión de trabajo robusta y confiable.",
precio:"Cotiza con asesor"
},

{
id:24,
nombre:"Ford Ranger XLT",
categoria:"Pickup",
imagen:"/img/ranger-xlt.jpg",
descripcion:"Equilibrio perfecto entre trabajo y confort.",
precio:"Cotiza con asesor"
},

{
id:25,
nombre:"Ford Ranger Limited",
categoria:"Pickup",
imagen:"/img/ranger-limited.jpg",
descripcion:"Versión premium de la Ranger.",
precio:"Cotiza con asesor"
},

{
id:26,
nombre:"Ford F-150 Raptor",
categoria:"Pickup",
imagen:"/img/f150-raptor.jpg",
descripcion:"Pickup off-road de alto desempeño.",
precio:"Cotiza con asesor"
},

{
id:27,
nombre:"Ford F-150 Platinum",
categoria:"Pickup",
imagen:"/img/f150-platinum.jpg",
descripcion:"Lujo y potencia en una pickup premium.",
precio:"Cotiza con asesor"
},

{
id:28,
nombre:"Ford Escape Hybrid",
categoria:"SUV",
imagen:"/img/escape-hybrid.jpg",
descripcion:"SUV híbrida eficiente y moderna.",
precio:"Cotiza con asesor"
},

{
id:29,
nombre:"Ford Explorer ST",
categoria:"SUV",
imagen:"/img/explorer-st.jpg",
descripcion:"SUV deportiva con gran potencia.",
precio:"Cotiza con asesor"
},

{
id:30,
nombre:"Ford Bronco Wildtrak",
categoria:"SUV",
imagen:"/img/bronco-wildtrak.jpg",
descripcion:"Versión off-road avanzada del Bronco.",
precio:"Cotiza con asesor"
},

{
id:31,
nombre:"Ford Maverick Tremor",
categoria:"Pickup",
imagen:"/img/maverick-tremor.jpg",
descripcion:"Pickup compacta con capacidades off-road.",
precio:"Cotiza con asesor"
},

{
id:32,
nombre:"Ford Mustang Mach-E",
categoria:"SUV",
imagen:"/img/mach-e.jpg",
descripcion:"SUV eléctrica con espíritu deportivo.",
precio:"Cotiza con asesor"
}

];

export default vehicles;
