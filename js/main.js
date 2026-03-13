// ============================================================
// FORD PARRAL | DIEGO VALENZUELA
// main.js CORREGIDO PARA LAYOUT ACTUAL
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  inicializarWhatsAppLinks();
  inicializarModalAviso();
  cargarCatalogo();
  inicializarFormulario();
  inicializarNavegacionActiva();
});

// ============================================================
// CONFIGURACION GLOBAL
// ============================================================

const TELEFONO_WHATSAPP = "526272850550";
const MENSAJE_WHATSAPP_GENERAL = "Hola Diego, quiero información sobre un Ford";

function obtenerCatalogo() {
  if (Array.isArray(window.CATALOGO_FORD)) return window.CATALOGO_FORD;
  if (Array.isArray(window.vehiculos)) return window.vehiculos;
  return [];
}

function escaparHTML(valor) {
  return String(valor ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function construirLinkWhatsApp(mensaje) {
  return `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

function inicializarWhatsAppLinks() {
  document.querySelectorAll(".wa-link").forEach((link) => {
    if (!link.getAttribute("href") || link.getAttribute("href").includes("wa.me")) {
      const texto = link.dataset.message || MENSAJE_WHATSAPP_GENERAL;
      link.href = construirLinkWhatsApp(texto);
    }
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

// ============================================================
// CATALOGO
// ============================================================

function cargarCatalogo() {
  const catalogo = obtenerCatalogo();

  const contenedorCatalogo = document.getElementById("catalogo-principal");
  const contenedorResumen = document.getElementById("modelos-resumen");
  const selectorVehiculo = document.getElementById("vehiculo");

  if (!contenedorCatalogo || !contenedorResumen || !selectorVehiculo) return;

  contenedorCatalogo.innerHTML = "";
  contenedorResumen.innerHTML = "";
  selectorVehiculo.innerHTML = `<option value="">Selecciona una versión</option>`;

  if (!catalogo.length) {
    contenedorCatalogo.innerHTML = `
      <div class="mensaje error">
        No se encontraron vehículos para mostrar en el catálogo.
      </div>
    `;
    return;
  }

  const opcionesAgregadas = new Set();

  catalogo.forEach((modelo, indexModelo) => {
    const imagenResumen =
      modelo.imagen ||
      modelo.versiones?.[0]?.imagen ||
      modelo.versiones?.[0]?.colores?.[0]?.imagen ||
      "public/logo-ford.png";

    // ========================================================
    // TARJETA RESUMEN
    // ========================================================
    const resumen = document.createElement("div");
    resumen.className = "model-summary-card";
    resumen.dataset.target = `modelo-${modelo.id}`;

    resumen.innerHTML = `
      <img src="${escaparHTML(imagenResumen)}" alt="${escaparHTML(modelo.nombre)}">
      <h3>${escaparHTML(modelo.nombre)}</h3>
      <span>${escaparHTML(modelo.categoria || "Modelo Ford")}</span>
    `;

    resumen.addEventListener("click", () => {
      document.querySelectorAll(".model-summary-card").forEach(card => {
        card.classList.remove("active");
      });
      resumen.classList.add("active");

      const destino = document.getElementById(`modelo-${modelo.id}`);
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    if (indexModelo === 0) {
      resumen.classList.add("active");
    }

    contenedorResumen.appendChild(resumen);

    // ========================================================
    // SECCION CONFIGURADOR POR MODELO
    // ========================================================
    const seccion = document.createElement("section");
    seccion.className = "configurator-shell";
    seccion.id = `modelo-${modelo.id}`;

    const primerVersion = modelo.versiones?.[0] || {};
    const primerColor = primerVersion.colores?.[0] || {};
    const imagenInicial =
      primerColor.imagen ||
      primerVersion.imagen ||
      imagenResumen;

    seccion.innerHTML = `
      <div class="config-left">
        <div class="config-title-row">
          <h3>${escaparHTML(modelo.nombre)}</h3>
          <div class="config-small-line"></div>
        </div>

        <div class="config-visual">
          <img
            id="imagenConfigurador-${escaparHTML(modelo.id)}"
            src="${escaparHTML(imagenInicial)}"
            alt="${escaparHTML(modelo.nombre)}"
          >
        </div>

        <div class="ia-note-config">
          Imágenes de referencia generadas con IA o material ilustrativo.
        </div>
      </div>

      <div class="config-right">
        <div class="config-actions-top">
          <span class="mini-pill">${escaparHTML(modelo.categoria || "Ford")}</span>
          <button
            type="button"
            class="mini-pill btn-scroll-contacto"
            data-modelo="${escaparHTML(modelo.nombre)}"
          >
            Solicitar información
          </button>
        </div>

        <div class="version-tabs" id="versionTabs-${escaparHTML(modelo.id)}"></div>

        <div class="version-header">
          <h4 id="versionNombre-${escaparHTML(modelo.id)}"></h4>
          <p id="versionDescripcion-${escaparHTML(modelo.id)}"></p>
        </div>

        <div class="color-row">
          <div class="color-label">Colores disponibles</div>
          <div class="color-swatches" id="colorSwatches-${escaparHTML(modelo.id)}"></div>
          <div class="color-name" id="colorNombre-${escaparHTML(modelo.id)}"></div>
        </div>

        <div class="ficha-grid" id="fichaGrid-${escaparHTML(modelo.id)}"></div>

        <div class="config-bottom-actions">
          <button
            type="button"
            class="btn btn-primary btn-cotizar-version"
            id="btnCotizar-${escaparHTML(modelo.id)}"
          >
            Cotizar versión
          </button>

          <a
            class="btn-whatsapp"
            id="btnWhatsApp-${escaparHTML(modelo.id)}"
            href="${construirLinkWhatsApp(`Hola Diego, quiero información sobre ${modelo.nombre}`)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    `;

    contenedorCatalogo.appendChild(seccion);

    // Agregar opciones al select
    (modelo.versiones || []).forEach((version) => {
      if (!opcionesAgregadas.has(version.nombre)) {
        const option = document.createElement("option");
        option.value = version.nombre;
        option.textContent = `${modelo.nombre} - ${version.nombre}`;
        selectorVehiculo.appendChild(option);
        opcionesAgregadas.add(version.nombre);
      }
    });

    inicializarConfiguradorModelo(modelo);
  });

  inicializarBotonesContactoCatalogo();
}

function inicializarConfiguradorModelo(modelo) {
  const tabsContainer = document.getElementById(`versionTabs-${modelo.id}`);
  const nombreEl = document.getElementById(`versionNombre-${modelo.id}`);
  const descripcionEl = document.getElementById(`versionDescripcion-${modelo.id}`);
  const colorSwatchesEl = document.getElementById(`colorSwatches-${modelo.id}`);
  const colorNombreEl = document.getElementById(`colorNombre-${modelo.id}`);
  const fichaGridEl = document.getElementById(`fichaGrid-${modelo.id}`);
  const imagenEl = document.getElementById(`imagenConfigurador-${modelo.id}`);
  const btnCotizar = document.getElementById(`btnCotizar-${modelo.id}`);
  const btnWhatsApp = document.getElementById(`btnWhatsApp-${modelo.id}`);
  const selectorVehiculo = document.getElementById("vehiculo");

  if (!tabsContainer || !nombreEl || !descripcionEl || !colorSwatchesEl || !colorNombreEl || !fichaGridEl || !imagenEl || !btnCotizar || !btnWhatsApp) {
    return;
  }

  let indiceVersionActual = 0;
  let indiceColorActual = 0;

  const versiones = Array.isArray(modelo.versiones) ? modelo.versiones : [];

  if (!versiones.length) return;

  function renderizarVersion(indiceVersion, indiceColor = 0) {
    indiceVersionActual = indiceVersion;
    indiceColorActual = indiceColor;

    const version = versiones[indiceVersionActual];
    if (!version) return;

    // Tabs activas
    tabsContainer.querySelectorAll(".version-tab").forEach((tab, i) => {
      tab.classList.toggle("active", i === indiceVersionActual);
    });

    nombreEl.textContent = version.nombre || modelo.nombre;
    descripcionEl.textContent = version.descripcion || "Consulta disponibilidad y equipamiento con tu asesor.";

    // Colores
    colorSwatchesEl.innerHTML = "";
    const colores = Array.isArray(version.colores) ? version.colores : [];

    if (colores.length) {
      const colorSeguro = colores[indiceColorActual] || colores[0];
      colorNombreEl.textContent = colorSeguro.nombre || "Color disponible";
      imagenEl.src = colorSeguro.imagen || version.imagen || modelo.imagen || "public/logo-ford.png";
      imagenEl.alt = `${modelo.nombre} ${version.nombre} ${colorSeguro.nombre || ""}`.trim();

      colores.forEach((color, indexColor) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "color-swatch";
        btn.title = color.nombre || `Color ${indexColor + 1}`;
        btn.style.background = color.codigo || "#cccccc";
        btn.setAttribute("aria-label", color.nombre || `Color ${indexColor + 1}`);

        if (indexColor === indiceColorActual) {
          btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
          renderizarVersion(indiceVersionActual, indexColor);
        });

        colorSwatchesEl.appendChild(btn);
      });
    } else {
      colorNombreEl.textContent = "Consulta colores disponibles";
      imagenEl.src = version.imagen || modelo.imagen || "public/logo-ford.png";
      imagenEl.alt = `${modelo.nombre} ${version.nombre}`.trim();
    }

    // Ficha técnica
    fichaGridEl.innerHTML = "";
    const ficha = version.ficha || {};

    if (Array.isArray(ficha)) {
      ficha.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "ficha-item";
        card.innerHTML = `
          <div class="ficha-label">Especificación ${index + 1}</div>
          <div class="ficha-value">${escaparHTML(item)}</div>
        `;
        fichaGridEl.appendChild(card);
      });
    } else {
      Object.entries(ficha).forEach(([clave, valor]) => {
        const card = document.createElement("div");
        card.className = "ficha-item";
        card.innerHTML = `
          <div class="ficha-label">${escaparHTML(formatearEtiquetaFicha(clave))}</div>
          <div class="ficha-value">${escaparHTML(valor)}</div>
        `;
        fichaGridEl.appendChild(card);
      });
    }

    const textoVersion = `${modelo.nombre} - ${version.nombre}`;
    btnCotizar.dataset.vehiculo = textoVersion;
    btnWhatsApp.href = construirLinkWhatsApp(`Hola Diego, quiero cotizar la versión ${textoVersion}`);

    btnCotizar.onclick = () => {
      if (selectorVehiculo) {
        const valorExacto = Array.from(selectorVehiculo.options).find(opt => opt.textContent === textoVersion);
        if (valorExacto) {
          selectorVehiculo.value = valorExacto.value;
        } else {
          selectorVehiculo.value = version.nombre;
        }
      }

      document.getElementById("contacto")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    };
  }

  // Crear tabs
  tabsContainer.innerHTML = "";
  versiones.forEach((version, index) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "version-tab";
    tab.textContent = version.nombre || `Versión ${index + 1}`;

    tab.addEventListener("click", () => {
      renderizarVersion(index, 0);
    });

    tabsContainer.appendChild(tab);
  });

  renderizarVersion(0, 0);
}

function formatearEtiquetaFicha(clave) {
  const mapa = {
    motor: "Motor",
    transmision: "Transmisión",
    traccion: "Tracción",
    enfoque: "Enfoque",
    potencia: "Potencia",
    torque: "Torque",
    capacidad: "Capacidad",
    combustible: "Combustible",
    seguridad: "Seguridad",
    interior: "Interior",
    tecnologia: "Tecnología"
  };

  return mapa[clave] || clave.charAt(0).toUpperCase() + clave.slice(1);
}

function inicializarBotonesContactoCatalogo() {
  document.querySelectorAll(".btn-scroll-contacto").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("contacto")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

// ============================================================
// FORMULARIO
// ============================================================

function inicializarFormulario() {
  const form = document.getElementById("formProspecto");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim() || "";
    const telefono = document.getElementById("telefono")?.value.trim() || "";
    const vehiculo = document.getElementById("vehiculo")?.value || "";
    const comentario = document.getElementById("comentario")?.value.trim() || "";
    const estado = document.getElementById("mensajeEstado");

    if (!estado) return;

    if (!nombre || !telefono || !vehiculo) {
      estado.innerHTML = `<div class="mensaje error">Completa nombre, teléfono y vehículo de interés.</div>`;
      return;
    }

    estado.innerHTML = `<div class="mensaje">Enviando...</div>`;

    try {
      if (!window.supabase) {
        throw new Error("Supabase no está disponible.");
      }

      const { error } = await window.supabase
        .from("prospectos")
        .insert([
          {
            nombre,
            telefono,
            vehiculo,
            comentario
          }
        ]);

      if (error) throw error;

      estado.innerHTML = `<div class="mensaje success">Gracias, te contactaremos pronto.</div>`;
      form.reset();

      if (typeof window.fbq !== "undefined") {
        window.fbq("track", "Lead");
      }
    } catch (err) {
      console.error("Error al guardar prospecto:", err);
      estado.innerHTML = `<div class="mensaje error">No se pudo enviar. Intenta nuevamente.</div>`;
    }
  });
}

// ============================================================
// MODAL AVISO LEGAL
// ============================================================

function inicializarModalAviso() {
  const modal = document.getElementById("modalAviso");
  if (!modal) return;

  const abrirAviso = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const cerrarAviso = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  document.getElementById("abrirAvisoTop")?.addEventListener("click", abrirAviso);
  document.getElementById("abrirAvisoContacto")?.addEventListener("click", abrirAviso);
  document.getElementById("cerrarAviso")?.addEventListener("click", cerrarAviso);
  document.getElementById("cerrarAvisoSecundario")?.addEventListener("click", cerrarAviso);
  document.getElementById("aceptarAviso")?.addEventListener("click", cerrarAviso);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarAviso();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      cerrarAviso();
    }
  });
}

// ============================================================
// NAVEGACION ACTIVA
// ============================================================

function inicializarNavegacionActiva() {
  const links = document.querySelectorAll(".main-nav .nav-link");
  const secciones = [
    document.getElementById("catalogo-seccion"),
    document.getElementById("contacto"),
    document.getElementById("quien-soy")
  ].filter(Boolean);

  if (!links.length || !secciones.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      links.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${id}`);
      });
    });
  }, {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.01
  });

  secciones.forEach((seccion) => observer.observe(seccion));
}
