document.addEventListener("DOMContentLoaded", () => {
  const modelosResumen = document.getElementById("modelos-resumen");
  const catalogoPrincipal = document.getElementById("catalogo-principal");
  const buscadorModelos = document.getElementById("buscadorModelos");
  const form = document.getElementById("formProspecto");
  const mensajeEstado = document.getElementById("mensajeEstado");
  const vehiculoSelect = document.getElementById("vehiculo");
  const telefonoAsesorEls = document.querySelectorAll(".asesor-telefono");
  const whatsappLinks = document.querySelectorAll(".wa-link");
  const navLinks = document.querySelectorAll(".nav-link");

  const modalAviso = document.getElementById("modalAviso");
  const abrirAvisoTop = document.getElementById("abrirAvisoTop");
  const abrirAvisoContacto = document.getElementById("abrirAvisoContacto");
  const cerrarAviso = document.getElementById("cerrarAviso");
  const cerrarAvisoSecundario = document.getElementById("cerrarAvisoSecundario");
  const aceptarAviso = document.getElementById("aceptarAviso");

  const whatsappNumber = window.APP_CONFIG?.WHATSAPP_NUMBER || "526272850550";
  const asesorTelefono = window.APP_CONFIG?.ASESOR_TELEFONO || "627 285 0550";
  const catalogo = window.CATALOGO_FORD || [];

  let waFloat = null;
  let ultimoElementoActivoAntesModal = null;

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function scrollSuaveA(selector) {
    const destino = document.querySelector(selector);
    if (!destino) return;
    destino.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function actualizarNavActiva() {
    const secciones = [
      { id: "#catalogo-seccion", link: '#catalogo-seccion' },
      { id: "#contacto", link: '#contacto' }
    ];

    const punto = window.scrollY + 180;

    secciones.forEach((item) => {
      const seccion = document.querySelector(item.id);
      const link = document.querySelector(`.nav-link[href="${item.link}"]`);
      if (!seccion || !link) return;

      const top = seccion.offsetTop;
      const bottom = top + seccion.offsetHeight;

      if (punto >= top && punto < bottom) {
        navLinks.forEach((nav) => nav.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }

  telefonoAsesorEls.forEach((el) => {
    el.textContent = asesorTelefono;
  });

  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hola Diego, quiero información de un vehículo Ford."
    )}`;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollSuaveA(href);
    });
  });

  function abrirModalAviso() {
    if (!modalAviso) return;
    ultimoElementoActivoAntesModal = document.activeElement;
    modalAviso.classList.add("open");
    modalAviso.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const primerBoton = modalAviso.querySelector("button");
    if (primerBoton) primerBoton.focus();
  }

  function cerrarModalAviso() {
    if (!modalAviso) return;
    modalAviso.classList.remove("open");
    modalAviso.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (ultimoElementoActivoAntesModal && typeof ultimoElementoActivoAntesModal.focus === "function") {
      ultimoElementoActivoAntesModal.focus();
    }
  }

  abrirAvisoTop?.addEventListener("click", abrirModalAviso);
  abrirAvisoContacto?.addEventListener("click", abrirModalAviso);
  cerrarAviso?.addEventListener("click", cerrarModalAviso);
  cerrarAvisoSecundario?.addEventListener("click", cerrarModalAviso);
  aceptarAviso?.addEventListener("click", cerrarModalAviso);

  modalAviso?.addEventListener("click", (e) => {
    if (e.target === modalAviso) cerrarModalAviso();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalAviso();
  });

  if (!catalogo.length) {
    if (catalogoPrincipal) {
      catalogoPrincipal.innerHTML = `
        <div class="admin-panel-card">
          <p class="mensaje error">No se encontró el catálogo. Revisa js/vehiculos.js</p>
        </div>
      `;
    }
    return;
  }

  function poblarSelectVehiculos() {
    if (!vehiculoSelect) return;

    const opciones = catalogo
      .flatMap((modelo) => (modelo.versiones || []).map((v) => v.nombre))
      .map((nombre) => `<option value="${escapeHtml(nombre)}">${escapeHtml(nombre)}</option>`)
      .join("");

    vehiculoSelect.innerHTML = `<option value="">Selecciona una versión</option>${opciones}`;
  }

  function placeholder(texto, color = "Color") {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0b3a75"/>
            <stop offset="100%" stop-color="#091728"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="700" fill="url(#bg)"/>
        <rect x="35" y="35" width="1130" height="630" rx="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.16)" />
        <text x="600" y="280" text-anchor="middle" fill="#ffffff" font-size="52" font-family="Arial, sans-serif" font-weight="700">
          ${escapeHtml(texto)}
        </text>
        <text x="600" y="350" text-anchor="middle" fill="#dbe7f5" font-size="28" font-family="Arial, sans-serif">
          ${escapeHtml(color)}
        </text>
        <text x="600" y="405" text-anchor="middle" fill="#9eb4d3" font-size="18" font-family="Arial, sans-serif">
          Imagen de referencia
        </text>
        <text x="600" y="450" text-anchor="middle" fill="#8fa7c7" font-size="16" font-family="Arial, sans-serif">
          Generada con IA · Ford Parral · Diego Valenzuela
        </text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function imagenDeVersion(version, colorObj) {
    if (colorObj?.imagen && String(colorObj.imagen).trim() !== "") return colorObj.imagen;
    return placeholder(version.nombre, colorObj?.nombre || "Color");
  }

  function mensajeWhatsAppVersion(versionNombre) {
    return `Hola Diego, me interesa ${versionNombre}. Quiero información, disponibilidad y cotización.`;
  }

  function crearBotonFlotante() {
    let boton = document.querySelector(".wa-float");

    if (!boton) {
      boton = document.createElement("a");
      boton.className = "wa-float";
      boton.target = "_blank";
      boton.rel = "noopener noreferrer";
      document.body.appendChild(boton);
    }

    waFloat = boton;
    return boton;
  }

  function actualizarBotonFlotante(versionNombre) {
    const boton = waFloat || crearBotonFlotante();

    boton.textContent = "Cotizar versión";
    boton.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      mensajeWhatsAppVersion(versionNombre)
    )}`;
    boton.setAttribute("aria-label", `Cotizar ${versionNombre} por WhatsApp`);
    boton.setAttribute("title", `Cotizar ${versionNombre}`);
  }

  function actualizarVehiculoSelect(versionNombre) {
    if (!vehiculoSelect) return;
    vehiculoSelect.value = versionNombre;
  }

  let modeloActivo = 0;
  let versionActiva = 0;
  let textoBusqueda = "";

  function crearResumenModelos(lista) {
    if (!modelosResumen) return;

    modelosResumen.innerHTML = lista
      .map((modelo, index) => {
        const primeraVersion = modelo.versiones?.[0];
        const primerColor = primeraVersion?.colores?.[0];
        const primeraImagen = primeraVersion
          ? imagenDeVersion(primeraVersion, primerColor)
          : placeholder(modelo.nombre);

        return `
          <article class="model-summary-card ${index === modeloActivo ? "active" : ""}" data-modelo-index="${index}">
            <h3>${escapeHtml(modelo.nombre)}</h3>
            <img
              src="${primeraImagen}"
              alt="${escapeHtml(modelo.nombre)}"
              loading="lazy"
              onerror="this.onerror=null;this.src='${placeholder(modelo.nombre)}'"
            >
            <span>• ${(modelo.versiones || []).length} versiones</span>
          </article>
        `;
      })
      .join("");

    document.querySelectorAll(".model-summary-card").forEach((card) => {
      card.addEventListener("click", () => {
        modeloActivo = Number(card.getAttribute("data-modelo-index"));
        versionActiva = 0;
        renderTodo();
        scrollSuaveA("#catalogo-seccion");
      });
    });
  }

  function crearVersionTabs(modelo) {
    return (modelo.versiones || [])
      .map((version, index) => {
        const nombreLimpio = version.nombre.replace(`${modelo.nombre} `, "");
        return `
          <button
            class="version-tab ${index === versionActiva ? "active" : ""}"
            data-version-index="${index}"
            type="button"
          >
            ${escapeHtml(nombreLimpio)}
          </button>
        `;
      })
      .join("");
  }

  function crearColores(version) {
    const colores = version.colores || [];

    if (!colores.length) {
      return `
        <div class="color-row">
          <span class="color-label">Colores de referencia</span>
          <div class="color-name">Por confirmar</div>
        </div>
      `;
    }

    return `
      <div class="color-row">
        <span class="color-label">Colores de referencia</span>
        <div class="color-swatches">
          ${colores
            .map(
              (color, index) => `
                <button
                  class="color-swatch ${index === 0 ? "active" : ""}"
                  style="background:${escapeHtml(color.codigo || "#cccccc")}"
                  data-color-index="${index}"
                  title="${escapeHtml(color.nombre || "Color")}"
                  aria-label="${escapeHtml(color.nombre || "Color")}"
                  type="button"
                ></button>
              `
            )
            .join("")}
        </div>
        <div class="color-name" id="color-name">${escapeHtml(colores[0]?.nombre || "")}</div>
      </div>
    `;
  }

  function crearFicha(version) {
    const ficha = version.ficha || {};

    return `
      <div class="ficha-grid">
        <div class="ficha-item">
          <span class="ficha-label">Motor</span>
          <span class="ficha-value">${escapeHtml(ficha.motor || "Por confirmar")}</span>
        </div>

        <div class="ficha-item">
          <span class="ficha-label">Transmisión</span>
          <span class="ficha-value">${escapeHtml(ficha.transmision || "Por confirmar")}</span>
        </div>

        <div class="ficha-item">
          <span class="ficha-label">Tracción</span>
          <span class="ficha-value">${escapeHtml(ficha.traccion || "Por confirmar")}</span>
        </div>

        <div class="ficha-item">
          <span class="ficha-label">Enfoque</span>
          <span class="ficha-value">${escapeHtml(ficha.enfoque || "Por confirmar")}</span>
        </div>
      </div>
    `;
  }

  function renderConfigurador(lista) {
    if (!catalogoPrincipal || !lista.length) {
      if (catalogoPrincipal) {
        catalogoPrincipal.innerHTML = `
          <div class="admin-panel-card">
            <p class="mensaje error">No encontramos modelos con esa búsqueda.</p>
          </div>
        `;
      }
      return;
    }

    if (modeloActivo >= lista.length) modeloActivo = 0;

    const modelo = lista[modeloActivo] || lista[0];
    if (!modelo) return;

    if (versionActiva >= (modelo.versiones || []).length) versionActiva = 0;

    const version = modelo.versiones[versionActiva] || modelo.versiones[0];
    if (!version) return;

    const colorInicial = version.colores?.[0];
    const imagen = imagenDeVersion(version, colorInicial);

    catalogoPrincipal.innerHTML = `
      <section class="configurator-shell">
        <div class="config-left">
          <div class="config-title-row">
            <h3>${escapeHtml(modelo.nombre)}</h3>
            <div class="config-small-line"></div>
          </div>

          <div class="config-visual">
            <img
              id="imagenConfigurador"
              src="${imagen}"
              alt="${escapeHtml(version.nombre)}"
              loading="eager"
              onerror="this.onerror=null;this.src='${placeholder(version.nombre, colorInicial?.nombre || "Color")}'"
            />
          </div>

          <div class="ia-note ia-note-config">
            Imágenes de referencia generadas con IA
          </div>
        </div>

        <div class="config-right">
          <div class="config-actions-top">
            <div class="mini-pill">Ficha técnica</div>
            <div class="mini-pill">Configurar</div>
            <button type="button" class="mini-pill" id="abrirAvisoConfigurador">Aviso legal</button>
          </div>

          <div class="version-tabs" id="versionTabs">
            ${crearVersionTabs(modelo)}
          </div>

          <div class="version-header">
            <h4>${escapeHtml(version.nombre)}</h4>
            <p>${escapeHtml(version.descripcion || "Consulta disponibilidad, equipamiento y condiciones vigentes.")}</p>
          </div>

          ${crearColores(version)}
          ${crearFicha(version)}

          <div class="config-bottom-actions">
            <a
              href="#contacto"
              class="btn btn-primary btn-cotizar-version"
              data-version-nombre="${escapeHtml(version.nombre)}"
            >
              Cotizar esta versión
            </a>

            <a
              class="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                mensajeWhatsAppVersion(version.nombre)
              )}"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </section>
    `;

    actualizarBotonFlotante(version.nombre);
    actualizarVehiculoSelect(version.nombre);

    document.getElementById("abrirAvisoConfigurador")?.addEventListener("click", abrirModalAviso);

    document.querySelectorAll(".version-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        versionActiva = Number(tab.getAttribute("data-version-index"));
        renderConfigurador(lista);
      });
    });

    document.querySelectorAll(".color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        const colorIndex = Number(btn.getAttribute("data-color-index"));
        const color = version.colores?.[colorIndex];
        const img = document.getElementById("imagenConfigurador");
        const colorName = document.getElementById("color-name");

        document.querySelectorAll(".color-swatch").forEach((el) => {
          el.classList.remove("active");
        });
        btn.classList.add("active");

        if (img) {
          img.src = imagenDeVersion(version, color);
          img.alt = `${version.nombre} - ${color?.nombre || "Color"}`;
        }

        if (colorName) colorName.textContent = color?.nombre || "Color";

        actualizarBotonFlotante(version.nombre);
        actualizarVehiculoSelect(version.nombre);
      });
    });

    document.querySelectorAll(".btn-cotizar-version").forEach((btn) => {
      btn.addEventListener("click", () => {
        const versionNombre = btn.getAttribute("data-version-nombre");
        actualizarVehiculoSelect(versionNombre);

        const comentario = document.getElementById("comentario");
        if (comentario && !comentario.value.trim()) {
          comentario.value = `Me interesa ${versionNombre}. Quiero información y disponibilidad.`;
        }
      });
    });
  }

  function filtrarModelos() {
    const termino = textoBusqueda.trim().toLowerCase();
    if (!termino) return catalogo;

    return catalogo.filter((modelo) => {
      const base = [
        modelo.nombre,
        modelo.categoria,
        ...(modelo.versiones || []).map((v) => v.nombre)
      ]
        .join(" ")
        .toLowerCase();

      return base.includes(termino);
    });
  }

  function renderTodo() {
    const lista = filtrarModelos();

    if (modeloActivo >= lista.length) modeloActivo = 0;

    crearResumenModelos(lista);
    renderConfigurador(lista);
  }

  if (buscadorModelos) {
    buscadorModelos.addEventListener("input", (e) => {
      textoBusqueda = e.target.value || "";
      modeloActivo = 0;
      versionActiva = 0;
      renderTodo();
    });
  }

  crearBotonFlotante();

  async function guardarProspecto(payload) {
    if (!window.db) throw new Error("Supabase no está inicializado.");
    const { error } = await window.db.from("prospectos").insert([payload]);
    if (error) throw error;
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const nombre = document.getElementById("nombre")?.value.trim() || "";
      const telefono = document.getElementById("telefono")?.value.trim() || "";
      const vehiculo = document.getElementById("vehiculo")?.value.trim() || "";
      const comentario = document.getElementById("comentario")?.value.trim() || "";

      if (!nombre || !telefono || !vehiculo) {
        if (mensajeEstado) {
          mensajeEstado.textContent = "Completa los campos obligatorios.";
          mensajeEstado.className = "mensaje error";
        }
        return;
      }

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Enviando...";
        }

        await guardarProspecto({
          nombre,
          telefono,
          vehiculo,
          comentario,
          ciudad: window.APP_CONFIG?.CIUDAD_OBJETIVO || "Parral, Chihuahua"
        });

        if (typeof fbq !== "undefined") {
          fbq("track", "Lead");
        }

        if (mensajeEstado) {
          mensajeEstado.textContent = "Gracias. Tu solicitud fue enviada correctamente.";
          mensajeEstado.className = "mensaje success";
        }

        const mensajeWhatsAppFormulario = `Hola Diego, soy ${nombre}.
Estoy interesado en ${vehiculo}.
Mi teléfono es ${telefono}.
${comentario ? `Comentario: ${comentario}` : "Quiero información y disponibilidad."}`;

        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeWhatsAppFormulario)}`,
          "_blank"
        );

        form.reset();
        renderTodo();
      } catch (error) {
        console.error(error);
        if (mensajeEstado) {
          mensajeEstado.textContent =
            "No se pudo guardar el prospecto. Revisa config.js, supabase-client.js y la tabla de Supabase.";
          mensajeEstado.className = "mensaje error";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Solicitar información";
        }
      }
    });
  }

  window.addEventListener("scroll", actualizarNavActiva, { passive: true });

  poblarSelectVehiculos();
  renderTodo();
  actualizarNavActiva();
});
