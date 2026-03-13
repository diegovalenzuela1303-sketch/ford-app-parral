// =============================
// CONFIGURACION WHATSAPP
// =============================

const telefonoWhatsApp = "526272850550";
const mensajeWhatsApp = "Hola Diego, quiero información sobre un Ford";

document.querySelectorAll(".wa-link").forEach(btn => {
  btn.href = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
  btn.target = "_blank";
});


// =============================
// CARGAR VEHICULOS
// =============================

function cargarCatalogo() {

  const contenedorCatalogo = document.getElementById("catalogo-principal");
  const contenedorResumen = document.getElementById("modelos-resumen");
  const selectorVehiculo = document.getElementById("vehiculo");

  if (!contenedorCatalogo) return;

  contenedorCatalogo.innerHTML = "";
  contenedorResumen.innerHTML = "";
  selectorVehiculo.innerHTML = "";

  vehiculos.forEach(modelo => {

    // ---------- RESUMEN ----------
    const resumen = document.createElement("div");
    resumen.className = "model-summary-card";

    resumen.innerHTML = `
      <img src="${modelo.imagen}" alt="${modelo.nombre}">
      <h3>${modelo.nombre}</h3>
    `;

    resumen.addEventListener("click", () => {

      const destino = document.getElementById(`modelo-${modelo.id}`);

      if(destino){
        destino.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

    contenedorResumen.appendChild(resumen);


    // ---------- CATALOGO ----------
    const seccionModelo = document.createElement("div");
    seccionModelo.className = "modelo-seccion";
    seccionModelo.id = `modelo-${modelo.id}`;

    let versionesHTML = "";

    modelo.versiones.forEach(version => {

      versionesHTML += `
        <div class="version-card">

          <img src="${version.imagen}" alt="${version.nombre}">

          <div class="version-info">

            <h4>${version.nombre}</h4>

            <ul>
              ${version.ficha.map(item => `<li>${item}</li>`).join("")}
            </ul>

            <button 
              class="btn btn-primary btn-version"
              data-version="${version.nombre}"
            >
              Cotizar versión
            </button>

          </div>

        </div>
      `;

      // agregar al select del formulario
      const option = document.createElement("option");
      option.value = version.nombre;
      option.textContent = version.nombre;

      selectorVehiculo.appendChild(option);

    });

    seccionModelo.innerHTML = `
      <h2>${modelo.nombre}</h2>
      <div class="version-grid">
        ${versionesHTML}
      </div>
    `;

    contenedorCatalogo.appendChild(seccionModelo);

  });

}


// =============================
// SELECCIONAR VERSION
// =============================

document.addEventListener("click", function(e){

  if(e.target.classList.contains("btn-version")){

    const version = e.target.dataset.version;

    const selectorVehiculo = document.getElementById("vehiculo");

    if(selectorVehiculo){

      selectorVehiculo.value = version;

      document.getElementById("contacto").scrollIntoView({
        behavior:"smooth"
      });

    }

  }

});


// =============================
// FORMULARIO PROSPECTO
// =============================

const form = document.getElementById("formProspecto");

if(form){

form.addEventListener("submit", async function(e){

  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const vehiculo = document.getElementById("vehiculo").value;
  const comentario = document.getElementById("comentario").value;

  const estado = document.getElementById("mensajeEstado");

  estado.innerHTML = "Enviando...";

  try{

    const { error } = await supabase
      .from("prospectos")
      .insert([
        {
          nombre,
          telefono,
          vehiculo,
          comentario
        }
      ]);

    if(error){
      throw error;
    }

    estado.innerHTML = "Gracias, te contactaremos pronto.";

    form.reset();

    // =============================
    // EVENTO META PIXEL
    // =============================

    if(typeof fbq !== "undefined"){
      fbq('track', 'Lead');
    }

  }

  catch(err){

    estado.innerHTML = "No se pudo enviar. Intenta nuevamente.";

    console.error(err);

  }

});

}


// =============================
// MODAL AVISO LEGAL
// =============================

const modal = document.getElementById("modalAviso");

function abrirAviso(){
  modal.style.display = "flex";
}

function cerrarAviso(){
  modal.style.display = "none";
}

document.getElementById("abrirAvisoTop")?.addEventListener("click", abrirAviso);
document.getElementById("abrirAvisoContacto")?.addEventListener("click", abrirAviso);

document.getElementById("cerrarAviso")?.addEventListener("click", cerrarAviso);
document.getElementById("cerrarAvisoSecundario")?.addEventListener("click", cerrarAviso);
document.getElementById("aceptarAviso")?.addEventListener("click", cerrarAviso);


// =============================
// INICIAR APP
// =============================

document.addEventListener("DOMContentLoaded", function(){

  cargarCatalogo();

});
