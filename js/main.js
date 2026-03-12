document.addEventListener("DOMContentLoaded", () => {
  const modelosResumen = document.getElementById("modelos-resumen");
  const catalogoPrincipal = document.getElementById("catalogo-principal");
  const buscadorModelos = document.getElementById("buscadorModelos");
  const form = document.getElementById("formProspecto");
  const mensajeEstado = document.getElementById("mensajeEstado");
  const vehiculoSelect = document.getElementById("vehiculo");
  const telefonoAsesorEls = document.querySelectorAll(".asesor-telefono");
  const whatsappLinks = document.querySelectorAll(".wa-link");

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

  telefonoAsesorEls.forEach((el) => {
    el.textContent = asesorTelefono;
  });

  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hola Diego, quiero información de un vehículo Ford."
    )}`;
  });

  function abrirModalAviso() {
    if (!modalAviso) return;
    modalAviso.classList.add("open");
    modalAviso.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function cerrarModalAviso() {
    if (!modalAviso) return;
    modalAviso.classList.remove("open");
    modalAviso.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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

  if (!catalogo.length) return;

  function poblarSelectVehiculos() {
    if (!vehiculoSelect) return;

    const opciones = catalogo
      .flatMap((modelo) => modelo.versiones.map((v) => v.nombre))
      .map((nombre) => `<option value="${nombre}">${nombre}</option>`)
      .join("");

    vehiculoSelect.innerHTML = `<option value="">Vehículo de interés</option>${opciones}`;
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
          ${texto}
        </text>
        <text x="600" y="350" text-anchor="middle" fill="#dbe7f5" font-size="28" font-family="Arial, sans-serif">
          ${color}
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
    if (colorObj?.imagen && colorObj.imagen.trim() !== "") return colorObj.imagen;
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

  let modeloActivo = 0;
  let versionActiva = 0;
  let textoBusqueda = "";

  function crearResumenModelos(lista) {
    if (!modelosResumen) return;

    modelosResumen.innerHTML = lista
      .map((modelo, index) => {
        const primeraVersion = modelo.versiones[0];
        const primeraImagen = imagenDeVersion(primeraVersion, primeraVersion.colores[0]);

        return `
          <article class="model-summary-card ${index === modeloActivo ? "active" : ""}" data-modelo-index="${index}">
            <h3>${modelo.nombre}</h3>
            <img src="${primeraImagen}" alt="${modelo.nombre}" onerror="this.onerror=null;this.src='${placeholder(modelo.nombre)}'">
            <span>• ${modelo.versiones.length} versiones</span>
          </article>
        `;
      })
      .join("");

    document.querySelectorAll(".model-summary-card").forEach((card) => {
      card.addEventListener("click", () => {
        modeloActivo = Number(card.getAttribute("data-modelo-index"));
        versionActiva = 0;
        renderTodo();
        document.getElementById("catalogo-seccion")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  function crearVersionTabs(modelo) {
    return modelo.versiones
      .map(
        (version, index) => `
          <button class="version-tab ${index === versionActiva ? "active" : ""}" data-version-index="${index}">
            ${version.nombre.replace(modelo.nombre + " ", "")}
          </button>
        `
      )
      .join("");
  }

  function crearColores(version) {
    return `
      <div class="color-row">
        <span class="color-label">Colores de referencia</span>
        <div class="color-swatches">
          ${version.colores
            .map(
              (color, index) => `
                <button
                  class="color-swatch ${index === 0 ? "active" : ""}"
                  style="background:${color.codigo}"
                  data-color-index="${index}"
                  title="${color.nombre}"
                  aria-label="${color.nombre}"
                  type="button"
                ></button>
              `
            )
            .join("")}
        </div>
        <div class="color-name" id="color-name">${version.colores[0]?.nombre || ""}</div>
      </div>
    `;
  }

  function crearFicha(version) {
    return `
      <div class="ficha-grid">
        <div class="ficha-item">
          <span class="ficha-label">Motor</span>
          <span class="ficha-value">${version.ficha.motor}</span>
        </div>
        <div class="ficha-item">
          <span class="ficha-label">Transmisión</span>
          <span class="ficha-value">${version.ficha.transmision}</span>
        </div>
        <div class="ficha-item">
          <span class="ficha-label">Tracción</span>
          <span class="ficha-value">${version.ficha.traccion}</span>
        </div>
        <div class="ficha-item">
          <span class="ficha-label">Enfoque</span>
          <span class="ficha-value">${version.ficha.enfoque}</span>
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

    const version = modelo.versiones[versionActiva] || modelo.versiones[0];
    const colorInicial = version.colores[0];
    const imagen = imagenDeVersion(version, colorInicial);

    catalogoPrincipal.innerHTML = `
      <section class="configurator-shell">
        <div class="config-left">
          <div class="config-title-row">
            <h3>${modelo.nombre}</h3>
            <div class="config-small-line"></div>
          </div>

          <div class="config-visual">
            <img
              id="imagenConfigurador"
              src="${imagen}"
              alt="${version.nombre}"
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
            <h4>${version.nombre}</h4>
            <p>${version.descripcion}</p>
          </div>

          ${crearColores(version)}
          ${crearFicha(version)}

          <div class="config-bottom-actions">
            <a
              href="#contacto"
              class="btn btn-primary btn-cotizar-version"
              data-version-nombre="${version.nombre}"
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
        const color = version.colores[colorIndex];
        const img = document.getElementById("imagenConfigurador");
        const colorName = document.getElementById("color-name");

        document.querySelectorAll(".color-swatch").forEach((el) => {
          el.classList.remove("active");
        });
        btn.classList.add("active");

        if (img) img.src = imagenDeVersion(version, color);
        if (colorName) colorName.textContent = color.nombre;

        actualizarBotonFlotante(version.nombre);
      });
    });

    document.querySelectorAll(".btn-cotizar-version").forEach((btn) => {
      btn.addEventListener("click", () => {
        const versionNombre = btn.getAttribute("data-version-nombre");
        if (vehiculoSelect) vehiculoSelect.value = versionNombre;

        const comentario = document.getElementById("comentario");
        if (comentario && !comentario.value.trim()) {
          comentario.value = `Me interesa ${versionNombre}. Quiero información y disponibilidad.`;
        }
      });
    });
  }

  function filtrarModelos() {
    if (!textoBusqueda.trim()) return catalogo;

    return catalogo.filter((modelo) => {
      const base = [
        modelo.nombre,
        modelo.categoria,
        ...modelo.versiones.map((v) => v.nombre)
      ]
        .join(" ")
        .toLowerCase();

      return base.includes(textoBusqueda.toLowerCase());
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

        if (mensajeEstado) {
          mensajeEstado.textContent = "Gracias. Tu solicitud fue enviada correctamente.";
          mensajeEstado.className = "mensaje success";
        }

        form.reset();
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

  poblarSelectVehiculos();
  renderTodo();
});
