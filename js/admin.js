document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const exportCsvBtn = document.getElementById("exportCsvBtn");

  const loginBox = document.getElementById("loginBox");
  const panelBox = document.getElementById("panelBox");
  const estadoLogin = document.getElementById("estadoLogin");
  const tablaBody = document.getElementById("tablaProspectos");

  const totalProspectos = document.getElementById("totalProspectos");
  const prospectosHoy = document.getElementById("prospectosHoy");
  const vehiculoTop = document.getElementById("vehiculoTop");
  const alertaProspecto = document.getElementById("alertaProspecto");

  let cacheProspectos = [];
  let realtimeChannel = null;

  function mostrarLogin() {
    loginBox.style.display = "block";
    panelBox.style.display = "none";
  }

  function mostrarPanel() {
    loginBox.style.display = "none";
    panelBox.style.display = "block";
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  function reproducirAlerta() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.35);
    } catch (error) {
      console.error("No se pudo reproducir alerta:", error);
    }
  }

  function mostrarAlertaNuevoProspecto() {
    if (!alertaProspecto) return;

    alertaProspecto.style.display = "block";
    alertaProspecto.classList.add("show");
    reproducirAlerta();

    setTimeout(() => {
      alertaProspecto.classList.remove("show");
      alertaProspecto.style.display = "none";
    }, 4000);
  }

  function descargarArchivo(nombre, contenido, tipo = "text/csv;charset=utf-8;") {
    const blob = new Blob([contenido], { type: tipo });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombre;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  }

  function exportarCSV() {
    if (!cacheProspectos.length) {
      alert("No hay prospectos para exportar.");
      return;
    }

    const encabezados = [
      "nombre",
      "telefono",
      "vehiculo",
      "comentario",
      "revisado",
      "ciudad",
      "created_at"
    ];

    const filas = cacheProspectos.map((p) => [
      p.nombre || "",
      p.telefono || "",
      p.vehiculo || "",
      p.comentario || "",
      p.revisado ? "si" : "no",
      p.ciudad || "",
      p.created_at || ""
    ]);

    const csv = [
      encabezados.join(","),
      ...filas.map((fila) =>
        fila.map((valor) => `"${String(valor).replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    descargarArchivo("prospectos-ford-parral.csv", csv);
  }

  async function eliminarProspecto(id, nombre) {
    const confirmar = confirm(`¿Eliminar el prospecto de ${nombre}?`);
    if (!confirmar) return;

    const { error } = await window.db
      .from("prospectos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar");
      return;
    }

    cargarProspectos();
  }

  async function marcarRevisado(id) {
    const { error } = await window.db
      .from("prospectos")
      .update({ revisado: true })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("No se pudo actualizar");
      return;
    }

    cargarProspectos();
  }

  function renderTabla(data) {
    if (!data.length) {
      tablaBody.innerHTML = `
        <tr>
          <td colspan="6" class="loading-cell">No hay prospectos</td>
        </tr>
      `;
      return;
    }

    tablaBody.innerHTML = data.map((p) => {
      const telefonoPlano = String(p.telefono || "").replace(/\s+/g, "");
      const telefonoWa = telefonoPlano.startsWith("52") ? telefonoPlano : `52${telefonoPlano}`;
      const fecha = p.created_at ? new Date(p.created_at).toLocaleString("es-MX") : "";

      return `
        <tr>
          <td>
            <strong>${escapeHtml(p.nombre)}</strong><br>
            <span class="fecha-mini">${fecha}</span>
          </td>

          <td>${escapeHtml(p.telefono)}</td>

          <td>${escapeHtml(p.vehiculo)}</td>

          <td>${escapeHtml(p.comentario)}</td>

          <td>${p.revisado ? "✅ Revisado" : "🟡 Nuevo"}</td>

          <td>
            <div class="acciones-admin">
              <a class="btn btn-dark btn-mini" href="tel:${telefonoPlano}">Llamar</a>

              <a
                class="btn btn-whatsapp btn-mini"
                href="https://wa.me/${telefonoWa}?text=${encodeURIComponent(`Hola ${p.nombre || ""}, te saluda Diego Valenzuela. Gracias por tu interés en ${p.vehiculo || "Ford"}.`)}"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>

              <button class="btn btn-dark btn-mini btn-revisado" data-id="${p.id}">
                Revisado
              </button>

              <button
                class="btn btn-danger btn-mini btn-delete"
                data-id="${p.id}"
                data-nombre="${escapeHtml(p.nombre)}"
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        eliminarProspecto(btn.dataset.id, btn.dataset.nombre);
      });
    });

    document.querySelectorAll(".btn-revisado").forEach((btn) => {
      btn.addEventListener("click", () => {
        marcarRevisado(btn.dataset.id);
      });
    });
  }

  function renderStats(data) {
    totalProspectos.textContent = data.length;

    const hoy = new Date().toISOString().slice(0, 10);
    const hoyCount = data.filter((p) => p.created_at?.slice(0, 10) === hoy);
    prospectosHoy.textContent = hoyCount.length;

    const conteoVehiculos = {};
    data.forEach((p) => {
      if (!conteoVehiculos[p.vehiculo]) conteoVehiculos[p.vehiculo] = 0;
      conteoVehiculos[p.vehiculo]++;
    });

    let top = "-";
    let max = 0;

    for (const vehiculo in conteoVehiculos) {
      if (conteoVehiculos[vehiculo] > max) {
        max = conteoVehiculos[vehiculo];
        top = vehiculo;
      }
    }

    vehiculoTop.textContent = top;
  }

  async function cargarProspectos() {
    tablaBody.innerHTML = `
      <tr>
        <td colspan="6" class="loading-cell">Cargando prospectos...</td>
      </tr>
    `;

    const { data, error } = await window.db
      .from("prospectos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      tablaBody.innerHTML = `
        <tr>
          <td colspan="6" class="loading-cell">Error al cargar prospectos</td>
        </tr>
      `;
      return;
    }

    cacheProspectos = data || [];
    renderStats(cacheProspectos);
    renderTabla(cacheProspectos);
  }

  function activarRealtime() {
    if (realtimeChannel) return;

    realtimeChannel = window.db
      .channel("prospectos-admin")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "prospectos"
        },
        async () => {
          mostrarAlertaNuevoProspecto();
          await cargarProspectos();
        }
      )
      .subscribe();
  }

  async function revisarSesion() {
    const { data, error } = await window.db.auth.getSession();

    if (error) {
      console.error(error);
      mostrarLogin();
      return;
    }

    if (data?.session) {
      mostrarPanel();
      await cargarProspectos();
      activarRealtime();
    } else {
      mostrarLogin();
    }
  }

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    const { error } = await window.db.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error(error);
      estadoLogin.textContent = "Correo o contraseña incorrectos";
      return;
    }

    estadoLogin.textContent = "";
    mostrarPanel();
    await cargarProspectos();
    activarRealtime();
  });

  logoutBtn?.addEventListener("click", async () => {
    if (realtimeChannel) {
      await window.db.removeChannel(realtimeChannel);
      realtimeChannel = null;
    }

    await window.db.auth.signOut();
    mostrarLogin();
  });

  exportCsvBtn?.addEventListener("click", exportarCSV);

  revisarSesion();
});
