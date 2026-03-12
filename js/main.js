document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("catalogo-lista");
  const form = document.getElementById("formProspecto");
  const mensajeEstado = document.getElementById("mensajeEstado");
  const vehiculoSelect = document.getElementById("vehiculo");
  const telefonoAsesorEls = document.querySelectorAll(".asesor-telefono");
  const whatsappLinks = document.querySelectorAll(".wa-link");

  const whatsappNumber = window.APP_CONFIG?.WHATSAPP_NUMBER || "526272850550";
  const asesorTelefono = window.APP_CONFIG?.ASESOR_TELEFONO || "627 285 0550";

  telefonoAsesorEls.forEach((el) => {
    el.textContent = asesorTelefono;
  });

  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hola Diego, quiero información de un vehículo Ford."
    )}`;
  });

  if (!contenedor) return;
  if (!window.CATALOGO_FORD || !Array.isArray(window.CATALOGO_FORD)) return;

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
        <text x="600" y="300" text-anchor="middle" fill="#ffffff" font-size="52" font-family="Arial, sans-serif" font-weight="700">
          ${texto}
        </text>
        <text x="600" y="380" text-anchor="middle" fill="#dbe7f5" font-size="28" font-family="Arial, sans-serif">
          ${color}
        </text>
        <text x="600" y="440" text-anchor="middle" fill="#9eb4d3" font-size="20" font-family="Arial, sans-serif">
          Ford Parral · Diego Valenzuela
        </text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function imagenDeVersion(version, colorObj) {
    if (colorObj?.imagen && colorObj.imagen.trim() !== "") return colorObj.imagen;
    return placeholder(version.nombre, colorObj?.nombre || "Color");
  }

  function crearModelo(modelo, indexModelo) {
    const versionInicial = modelo.versiones[0];
    const colorInicial = versionInicial.colores[0];

    return `
      <article class="modelo-card" data-modelo="${indexModelo}">
        <div class="modelo-top">
          <div>
            <div class="vehiculo-badge">${modelo.categoria}</div>
            <h3 class="modelo-title">${modelo.nombre}</h3>
            <p class="modelo-desc">${modelo.descripcion}</p>
          </div>

          <button class="modelo-toggle btn btn-secondary" data-toggle="${indexModelo}">
            Ver versiones
          </button>
        </div>

        <div class="modelo-body" id="modelo-body-${indexModelo}">
          <div class="modelo-visual">
            <img
              src="${imagenDeVersion(versionInicial, colorInicial)}"
              alt="${versionInicial.nombre}"
              class="modelo-img"
              id="modelo-img-${indexModelo}"
            />
          </div>

          <div class="modelo-config">
            <div class="version-tabs" id="version-tabs-${indexModelo}">
              ${modelo.versiones
                .map(
                  (version, i) => `
                  <button
                    class="version-tab ${i === 0 ? "active" : ""}"
                    data-modelo="${indexModelo}"
                    data-version="${i}"
                  >
                    ${version.nombre}
                  </button>
                `
                )
                .join("")}
            </div>

            <div class="version-panel" id="version-panel-${indexModelo}">
              ${crearVersionPanel(modelo, 0)}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function crearVersionPanel(modelo, indexVersion) {
    const version = modelo.versiones[indexVersion];
    const colorInicial = version.colores[0];

    return `
      <div class="version-header">
        <h4>${version.nombre}</h4>
        <p>${version.descripcion}</p>
      </div>

      <div class="color-row">
        <span class="color-label">Colores disponibles</span>
        <div class="color-swatches">
          ${version.colores
            .map(
              (color, i) => `
              <button
                class="color-swatch ${i === 0 ? "active" : ""}"
                style="background:${color.codigo};"
                title="${color.nombre}"
                data-color-nombre="${color.nombre}"
                data-color-img="${color.imagen || ""}"
                data-modelo-color="${modelo.id}"
                data-version-color="${version.id}"
              ></button>
            `
            )
            .join("")}
        </div>
        <div class="color-name" id="color-name-${modelo.id}-${version.id}">${colorInicial.nombre}</div>
      </div>

      <div class="ficha-tecnica">
        <h4>Ficha técnica</h4>
        <ul>
          <li><strong>Motor:</strong> ${version.ficha.motor}</li>
          <li><strong>Transmisión:</strong> ${version.ficha.transmision}</li>
          <li><strong>Tracción:</strong> ${version.ficha.traccion}</li>
          <li><strong>Enfoque:</strong> ${version.ficha.enfoque}</li>
        </ul>
      </div>

      <div class="card-actions">
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
            `Hola Diego, me interesa ${version.nombre}. Quiero información, disponibilidad y cotización.`
          )}"
        >
          WhatsApp directo
        </a>
      </div>
    `;
  }

  contenedor.innerHTML = `
    <div class="modelos-grid">
      ${window.CATALOGO_FORD.map((modelo, i) => crearModelo(modelo, i)).join("")}
    </div>
  `;

  document.querySelectorAll(".modelo-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-toggle");
      const body = document.getElementById(`modelo-body-${idx}`);
      const abierto = body.classList.contains("open");

      document.querySelectorAll(".modelo-body").forEach((el) => el.classList.remove("open"));
      document.querySelectorAll(".modelo-toggle").forEach((el) => (el.textContent = "Ver versiones"));

      if (!abierto) {
        body.classList.add("open");
        btn.textContent = "Ocultar versiones";
      }
    });
  });

  document.querySelectorAll(".version-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const indexModelo = Number(tab.getAttribute("data-modelo"));
      const indexVersion = Number(tab.getAttribute("data-version"));
      const modelo = window.CATALOGO_FORD[indexModelo];

      document
        .querySelectorAll(`#version-tabs-${indexModelo} .version-tab`)
        .forEach((el) => el.classList.remove("active"));

      tab.classList.add("active");

      document.getElementById(`version-panel-${indexModelo}`).innerHTML = crearVersionPanel(
        modelo,
        indexVersion
      );

      const version = modelo.versiones[indexVersion];
      const colorInicial = version.colores[0];
      const img = document.getElementById(`modelo-img-${indexModelo}`);
      img.src = imagenDeVersion(version, colorInicial);

      activarEventosColor(indexModelo, indexVersion);
      activarEventosCotizar();
    });
  });

  function activarEventosColor(indexModelo, indexVersion) {
    const modelo = window.CATALOGO_FORD[indexModelo];
    const version = modelo.versiones[indexVersion];
    const img = document.getElementById(`modelo-img-${indexModelo}`);
    const colorName = document.getElementById(`color-name-${modelo.id}-${version.id}`);

    document.querySelectorAll(`[data-modelo-color="${modelo.id}"][data-version-color="${version.id}"]`).forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(`[data-modelo-color="${modelo.id}"][data-version-color="${version.id}"]`)
          .forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        const nombreColor = btn.getAttribute("data-color-nombre");
        const colorImg = btn.getAttribute("data-color-img");
        const colorObj = { nombre: nombreColor, imagen: colorImg };

        img.src = imagenDeVersion(version, colorObj);
        if (colorName) colorName.textContent = nombreColor;
      });
    });
  }

  function activarEventosCotizar() {
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

  // abrir el primero por defecto
  const primerBody = document.getElementById("modelo-body-0");
  const primerBtn = document.querySelector(`[data-toggle="0"]`);
  if (primerBody && primerBtn) {
    primerBody.classList.add("open");
    primerBtn.textContent = "Ocultar versiones";
    activarEventosColor(0, 0);
  }

  activarEventosCotizar();

  if (!document.querySelector(".wa-float")) {
    const waFloat = document.createElement("a");
    waFloat.className = "wa-float";
    waFloat.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hola Diego, quiero información de un vehículo Ford."
    )}`;
    waFloat.target = "_blank";
    waFloat.rel = "noopener noreferrer";
    waFloat.textContent = "WhatsApp";
    document.body.appendChild(waFloat);
  }

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
});
