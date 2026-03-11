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

  function crearCard(vehiculo) {
    return `
      <div class="vehiculo-card">

        <div class="vehiculo-img-wrap">
          <img src="${vehiculo.imagen}" alt="${vehiculo.nombre}" class="vehiculo-img">
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
              href="https://wa.me/526272850550?text=Hola Diego, me interesa ${vehiculo.nombre}" 
              target="_blank">
              Cotizar por WhatsApp
            </a>

          </div>

        </div>

      </div>
    `;
  }

  catalogo.innerHTML = window.VEHICULOS.map(crearCard).join("");

});
