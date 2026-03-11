document.addEventListener("DOMContentLoaded", () => {
  const asesorNombre = window.APP_CONFIG?.ASESOR_NOMBRE || "Diego Valenzuela";
  const asesorTelefono = window.APP_CONFIG?.ASESOR_TELEFONO || "627 285 0550";
  const whatsappNumber = window.APP_CONFIG?.WHATSAPP_NUMBER || "526272850550";

  const catalogo = document.getElementById("catalogo");
  const yearEl = document.getElementById("year");
  const form = document.getElementById("formProspecto");
  const vehiculoSelect = document.getElementById("vehiculo");
  const mensajeEstado = document.getElementById("mensajeEstado");
  const nombreAsesorEls = document.querySelectorAll(".asesor-nombre");
  const telefonoAsesorEls = document.querySelectorAll(".asesor-telefono");
  const whatsappLinks = document.querySelectorAll(".wa-link");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  nombreAsesorEls.forEach((el) => (el.textContent = asesorNombre));
  telefonoAsesorEls.forEach((el) => (el.textContent = asesorTelefono));

  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola Diego, quiero información de un vehículo Ford.")}`;
  });

  function crearCard(vehiculo) {
    return `
      <article class="vehiculo-card" id="${vehiculo.id}">
        <div class="vehiculo-img-wrap">
          <img src="${vehiculo.imagen}" alt="${vehiculo.nombre}" class="vehiculo-img" loading="lazy" />
        </div>
        <div class="vehiculo-info">
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
            <a class="btn btn-outline" href="#contacto" data-vehiculo="${vehiculo.nombre}">Cotizar</a>
            <a class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer"
               href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola Diego, me interesa ${vehiculo.nombre}. Quiero información.`)}">
               WhatsApp
            </a>
          </div>
        </div>
      </article>
    `;
  }

  if (catalogo) {
    catalogo.innerHTML = window.VEHICULOS.map(crearCard).join("");

    document.querySelectorAll("[data-vehiculo]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const vehiculo = btn.getAttribute("data-vehiculo");
        if (vehiculoSelect) vehiculoSelect.value = vehiculo;
      });
    });
  }

  async function guardarProspecto(payload) {
    const { error } = await window.db.from("prospectos").insert([payload]);
    if (error) throw error;
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const nombre = document.getElementById("nombre").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const vehiculo = document.getElementById("vehiculo").value.trim();
      const comentario = document.getElementById("comentario").value.trim();

      if (!nombre || !telefono || !vehiculo) {
        mensajeEstado.textContent = "Completa los campos obligatorios.";
        mensajeEstado.className = "mensaje error";
        return;
      }

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        await guardarProspecto({
          nombre,
          telefono,
          vehiculo,
          comentario,
          ciudad: window.APP_CONFIG?.CIUDAD_OBJETIVO || "Parral, Chihuahua"
        });

        mensajeEstado.textContent = "Gracias. Tu solicitud fue enviada correctamente.";
        mensajeEstado.className = "mensaje success";
        form.reset();
      } catch (error) {
        console.error(error);
        mensajeEstado.textContent = "No se pudo enviar en este momento. Revisa config.js y Supabase.";
        mensajeEstado.className = "mensaje error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Solicitar información";
      }
    });
  }
});
