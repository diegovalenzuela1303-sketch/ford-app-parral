document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo-lista");
  const form = document.getElementById("formProspecto");
  const mensajeEstado = document.getElementById("mensajeEstado");
  const vehiculoSelect = document.getElementById("vehiculo");
  const yearEl = document.getElementById("year");
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

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (!catalogo) {
    console.error("No se encontró el contenedor del catálogo.");
    return;
  }

  if (!window.VEHICULOS || !Array.isArray(window.VEHICULOS)) {
    console.error("No se encontraron los vehículos.");
    return;
  }

  const MAPA_CATEGORIAS = {
    "ranger-xl": "Pickups",
    "ranger-xlt": "Pickups",
    "ranger-lariat": "Pickups",
    "ranger-raptor": "Pickups",
    "ranger-wildtrak": "Pickups",
    "ranger-tremor": "Pickups",

    "f150-xl": "Pickups",
    "f150-xlt": "Pickups",
    "f150-lariat": "Pickups",
    "f150-platinum": "Pickups",
    "f150-tremor": "Pickups",
    "f150-raptor": "Pickups",
    "f150-lightning": "Pickups",

    "f250-xl": "Pickups",
    "f250-xlt": "Pickups",
    "f250-lariat": "Pickups",

    "f350-xl": "Pickups",
    "f350-xlt": "Pickups",
    "f350-lariat": "Pickups",

    "territory-trend": "SUV",
    "territory-titanium": "SUV",
    "escape": "SUV",
    "edge-st": "SUV",
    "explorer-xlt": "SUV",
    "explorer-limited": "SUV",
    "explorer-st": "SUV",
    "expedition-limited": "SUV",
    "expedition-platinum": "SUV",
    "bronco-big-bend": "SUV",
    "bronco-wildtrak": "SUV",
    "bronco-raptor": "SUV",
    "bronco-sport": "SUV",

    "mustang-ecoboost": "Deportivos",
    "mustang-gt": "Deportivos",
    "mustang-dark-horse": "Deportivos"
  };

  const vehiculos = window.VEHICULOS.map((v) => ({
    ...v,
    categoria: MAPA_CATEGORIAS[v.id] || "Otros"
  }));

  function placeholder(nombre) {
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
        <text x="600" y="320" text-anchor="middle" fill="#ffffff" font-size="52" font-family="Arial, sans-serif" font-weight="700">
          ${nombre}
        </text>
        <text x="600" y="390" text-anchor="middle" fill="#dbe7f5" font-size="28" font-family="Arial, sans-serif">
          Imagen próximamente
        </text>
        <text x="600" y="445" text-anchor="middle" fill="#9eb4d3" font-size="20" font-family="Arial, sans-serif">
          Ford Parral · Diego Valenzuela
        </text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function getImagen(vehiculo) {
    if (vehiculo.imagen && vehiculo.imagen.trim() !== "") {
      return vehiculo.imagen;
    }
    return placeholder(vehiculo.nombre);
  }

  function crearCard(vehiculo) {
    const imagenFinal = getImagen(vehiculo);
    const whatsappText = encodeURIComponent(
      `Hola Diego, me interesa ${vehiculo.nombre}. Quiero cotización, disponibilidad y opciones.`
    );

    return `
      <article class="vehiculo-card" id="${vehiculo.id}">
        <div class="vehiculo-img-wrap">
          <img
            src="${imagenFinal}"
            alt="${vehiculo.nombre}"
            class="vehiculo-img"
            loading="lazy"
            onerror="this.onerror=null;this.src='${placeholder(vehiculo.nombre)}';"
          />
        </div>

        <div class="vehiculo-info">
          <div class="vehiculo-badge">${vehiculo.categoria}</div>
          <h3>${vehiculo.nombre}</h3>
          <p class="vehiculo-desc">${vehiculo.descripcion}</p>

          <div class="ficha-tecnica">
            <h4>Ficha técnica</h4>
            <ul>
              <li><strong>Motor:</strong> ${vehiculo.ficha.motor}</li>
              <li><strong>Transmisión:</strong> ${vehiculo.ficha.transmision}</li>
              <li><strong>Tracción:</strong> ${vehiculo.ficha.traccion}</li>
              <li><strong>Enfoque:</strong> ${vehiculo.ficha.enfoque}</li>
            </ul>
          </div>

          <div class="card-actions">
            <a
              class="btn btn-primary btn-cotizar"
              href="#contacto"
              data-vehiculo="${vehiculo.nombre}"
            >
              Cotizar este vehículo
            </a>

            <a
              class="btn btn-whatsapp"
              href="https://wa.me/${whatsappNumber}?text=${whatsappText}"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp directo
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function agruparPorCategoria(lista) {
    return {
      Pickups: lista.filter((v) => v.categoria === "Pickups"),
      SUV: lista.filter((v) => v.categoria === "SUV"),
      Deportivos: lista.filter((v) => v.categoria === "Deportivos"),
      Otros: lista.filter((v) => v.categoria === "Otros")
    };
  }

  function activarBotonesCotizar() {
    document.querySelectorAll(".btn-cotizar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const vehiculo = btn.getAttribute("data-vehiculo");
        if (vehiculoSelect) {
          vehiculoSelect.value = vehiculo;
        }

        const comentario = document.getElementById("comentario");
        if (comentario && !comentario.value.trim()) {
          comentario.value = `Me interesa ${vehiculo}. Quiero cotización y disponibilidad.`;
        }
      });
    });
  }

  function renderCatalogo(lista) {
    const grupos = agruparPorCategoria(lista);

    const bloques = Object.entries(grupos)
      .filter(([, items]) => items.length > 0)
      .map(([categoria, items]) => {
        return `
          <section class="catalogo-categoria">
            <div class="categoria-header">
              <h3>${categoria}</h3>
              <span>${items.length} unidades</span>
            </div>
            <div class="catalogo-grid-interno">
              ${items.map(crearCard).join("")}
            </div>
          </section>
        `;
      })
      .join("");

    catalogo.innerHTML =
      bloques ||
      `
      <div class="sin-resultados">
        No encontramos unidades con ese filtro.
      </div>
    `;

    activarBotonesCotizar();
  }

  const filtroHTML = `
    <div class="catalogo-toolbar">
      <input
        type="text"
        id="buscadorVehiculos"
        class="catalogo-search"
        placeholder="Buscar por nombre, motor o enfoque..."
      />
      <div class="catalogo-filtros">
        <button class="filtro-btn active" data-categoria="Todos">Todos</button>
        <button class="filtro-btn" data-categoria="Pickups">Pickups</button>
        <button class="filtro-btn" data-categoria="SUV">SUV</button>
        <button class="filtro-btn" data-categoria="Deportivos">Deportivos</button>
      </div>
    </div>
  `;

  catalogo.insertAdjacentHTML("beforebegin", filtroHTML);

  const buscador = document.getElementById("buscadorVehiculos");
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  let categoriaActiva = "Todos";

  function aplicarFiltros() {
    const texto = (buscador?.value || "").trim().toLowerCase();

    const filtrados = vehiculos.filter((v) => {
      const coincideCategoria =
        categoriaActiva === "Todos" ? true : v.categoria === categoriaActiva;

      const baseTexto = [
        v.nombre,
        v.descripcion,
        v.ficha.motor,
        v.ficha.transmision,
        v.ficha.traccion,
        v.ficha.enfoque,
        v.categoria
      ]
        .join(" ")
        .toLowerCase();

      const coincideTexto = baseTexto.includes(texto);

      return coincideCategoria && coincideTexto;
    });

    renderCatalogo(filtrados);
  }

  filtroBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtroBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      categoriaActiva = btn.dataset.categoria;
      aplicarFiltros();
    });
  });

  if (buscador) {
    buscador.addEventListener("input", aplicarFiltros);
  }

  renderCatalogo(vehiculos);

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
    if (!window.db) {
      throw new Error("Supabase no está inicializado.");
    }

    const { error } = await window.db.from("prospectos").insert([payload]);
    if (error) throw error;
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
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
});;
