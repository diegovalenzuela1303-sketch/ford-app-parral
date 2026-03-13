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
    document.body.style.overflow = "hidden";
  }

  function cerrarModalAviso() {
    if (!modalAviso) return;
    modalAviso.classList.remove("open");
    document.body.style.overflow = "";
  }

  abrirAvisoTop?.addEventListener("click", abrirModalAviso);
  abrirAvisoContacto?.addEventListener("click", abrirModalAviso);
  cerrarAviso?.addEventListener("click", cerrarModalAviso);
  cerrarAvisoSecundario?.addEventListener("click", cerrarModalAviso);
  aceptarAviso?.addEventListener("click", cerrarModalAviso);

  if (!catalogo.length) return;

  function poblarSelectVehiculos() {
    if (!vehiculoSelect) return;

    const opciones = catalogo
      .flatMap((modelo) => modelo.versiones.map((v) => v.nombre))
      .map((nombre) => `<option value="${nombre}">${nombre}</option>`)
      .join("");

    vehiculoSelect.innerHTML =
      `<option value="">Vehículo de interés</option>${opciones}`;
  }

  function imagenDeVersion(version, colorObj) {
    if (colorObj?.imagen) return colorObj.imagen;
    return "";
  }

  let modeloActivo = 0;
  let versionActiva = 0;

  function crearResumenModelos(lista) {

    modelosResumen.innerHTML = lista.map((modelo, index) => {

      const primeraVersion = modelo.versiones[0];
      const primeraImagen = primeraVersion.colores[0].imagen;

      return `
      <article class="model-summary-card ${index === modeloActivo ? "active" : ""}" data-modelo-index="${index}">
        <h3>${modelo.nombre}</h3>
        <img src="${primeraImagen}">
        <span>${modelo.versiones.length} versiones</span>
      </article>
      `;

    }).join("");

    document.querySelectorAll(".model-summary-card").forEach((card) => {

      card.addEventListener("click", () => {

        modeloActivo = Number(card.dataset.modeloIndex);
        versionActiva = 0;
        renderTodo();

        document.getElementById("catalogo-seccion")
        ?.scrollIntoView({ behavior: "smooth" });

      });

    });

  }

  function crearVersionTabs(modelo) {

    return modelo.versiones.map((version, index) => `
      <button class="version-tab ${index === versionActiva ? "active" : ""}" data-version-index="${index}">
        ${version.nombre.replace(modelo.nombre + " ", "")}
      </button>
    `).join("");

  }

  function crearColores(version) {

    return `
    <div class="color-row">

      <span class="color-label">Colores</span>

      <div class="color-swatches">

      ${version.colores.map((color, index) => `
        <button
        class="color-swatch ${index === 0 ? "active" : ""}"
        style="background:${color.codigo}"
        data-color-index="${index}"
        title="${color.nombre}">
        </button>
      `).join("")}

      </div>

      <div class="color-name" id="color-name">
        ${version.colores[0]?.nombre}
      </div>

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

    const modelo = lista[modeloActivo];
    const version = modelo.versiones[versionActiva];
    const imagen = version.colores[0].imagen;

    catalogoPrincipal.innerHTML = `

    <section class="configurator-shell">

      <div class="config-left">

        <div class="config-visual">
          <img id="imagenConfigurador" src="${imagen}">
        </div>

      </div>

      <div class="config-right">

        <div class="version-tabs">
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
          data-version-nombre="${version.nombre}">
          Cotizar esta versión
          </a>

          <a
          class="btn btn-whatsapp"
          target="_blank"
          href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Hola Diego, me interesa ${version.nombre}`
          )}">
          WhatsApp
          </a>

        </div>

      </div>

    </section>
    `;

    document.querySelectorAll(".version-tab").forEach((tab) => {

      tab.addEventListener("click", () => {

        versionActiva = Number(tab.dataset.versionIndex);
        renderConfigurador(lista);

      });

    });

    document.querySelectorAll(".color-swatch").forEach((btn) => {

      btn.addEventListener("click", () => {

        const colorIndex = Number(btn.dataset.colorIndex);
        const color = version.colores[colorIndex];

        document.getElementById("imagenConfigurador").src = color.imagen;
        document.getElementById("color-name").textContent = color.nombre;

        document.querySelectorAll(".color-swatch")
        .forEach((el) => el.classList.remove("active"));

        btn.classList.add("active");

      });

    });

  }

  function renderTodo() {

    crearResumenModelos(catalogo);
    renderConfigurador(catalogo);

  }

  async function guardarProspecto(payload) {

    const { error } = await window.db
    .from("prospectos")
    .insert([payload]);

    if (error) throw error;

  }

  if (form) {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const vehiculo = document.getElementById("vehiculo").value.trim();
      const comentario = document.getElementById("comentario").value.trim();

      if (!nombre || !telefono || !vehiculo) return;

      try {

        await guardarProspecto({
          nombre,
          telefono,
          vehiculo,
          comentario
        });

        /* EVENTO PIXEL */

        if (typeof fbq !== "undefined") {
          fbq('track', 'Lead');
        }

        /* WHATSAPP AUTOMÁTICO */

        const mensaje = `Hola Diego, soy ${nombre}. Estoy interesado en ${vehiculo}. Mi teléfono es ${telefono}. ${comentario}`;

        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`,
          "_blank"
        );

        mensajeEstado.textContent =
        "Gracias. Tu solicitud fue enviada correctamente.";

        form.reset();

      } catch (error) {

        mensajeEstado.textContent =
        "No se pudo guardar el prospecto.";

      }

    });

  }

  poblarSelectVehiculos();
  renderTodo();

});
