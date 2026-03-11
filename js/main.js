document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo-lista");
  const yearEl = document.getElementById("year");

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

  function crearPlaceholder(nombre) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0b3a75"/>
            <stop offset="100%" stop-color="#091728"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#bg)"/>
        <rect x="60" y="60" width="1080" height="680" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
        <text x="600" y="330" text-anchor="middle" fill="#ffffff" font-size="58" font-family="Arial, sans-serif" font-weight="700">
          ${nombre}
        </text>
        <text x="600" y="410" text-anchor="middle" fill="#d9e6f7" font-size="28" font-family="Arial, sans-serif">
          Imagen próximamente
        </text>
        <text x="600" y="470" text-anchor="middle" fill="#9fb7d8" font-size="22" font-family="Arial, sans-serif">
          Ford Parral · Diego Valenzuela
        </text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function obtenerImagen(vehiculo) {
    if (
      vehiculo.imagen &&
      vehiculo.imagen.trim() !== "" &&
      vehiculo.imagen !== "public/placeholder.jpg"
    ) {
      return vehiculo.imagen;
    }
    return crearPlaceholder(vehiculo.nombre);
  }

  function crearCard(vehiculo) {
    const imagenFinal = obtenerImagen(vehiculo);

    return `
      <div class="vehiculo-card">
        <div class="vehiculo-img-wrap">
          <img
            src="${imagenFinal}"
            alt="${vehiculo.nombre}"
            class="vehiculo-img"
            loading="lazy"
            onerror="this.onerror=null;this.src='${crearPlaceholder(vehiculo.nombre)}';"
          >
        </div>

        <div class="vehiculo-info">
          <h3>${vehiculo.nombre}</h3>

          <p class="vehiculo-desc">
            ${vehiculo.descripcion}
          </p>

          <div class="ficha-tecnica">
            <ul>
              <li><strong>Motor:</strong> ${vehiculo.ficha.motor}</li>
              <li><strong>Transmisión:</strong> ${vehiculo.ficha.transmision}</li>
              <li><strong>Tracción:</strong> ${vehiculo.ficha.traccion}</li>
              <li><strong>Enfoque:</strong> ${vehiculo.ficha.enfoque}</li>
            </ul>
          </div>

          <div class="card-actions">
            <a
              class="btn btn-outline"
              href="https://wa.me/526272850550?text=${encodeURIComponent(`Hola Diego, me interesa ${vehiculo.nombre}`)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
  }

  catalogo.innerHTML = window.VEHICULOS.map(crearCard).join("");
});;
