document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBox = document.getElementById("loginBox");
  const panelBox = document.getElementById("panelBox");
  const estadoLogin = document.getElementById("estadoLogin");
  const tablaBody = document.getElementById("tablaProspectos");
  const totalProspectos = document.getElementById("totalProspectos");

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

  async function eliminarProspecto(id, nombre) {
    const confirmar = confirm(`¿Eliminar el prospecto de ${nombre}?`);
    if (!confirmar) return;

    try {
      const { error } = await window.db
        .from("prospectos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await cargarProspectos();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el prospecto.");
    }
  }

  async function cargarProspectos() {
    tablaBody.innerHTML = `
      <tr>
        <td colspan="6" class="loading-cell">Cargando prospectos...</td>
      </tr>
    `;

    try {
      const { data, error } = await window.db
        .from("prospectos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      totalProspectos.textContent = data.length;

      if (!data.length) {
        tablaBody.innerHTML = `
          <tr>
            <td colspan="6" class="loading-cell">Aún no hay prospectos registrados.</td>
          </tr>
        `;
        return;
      }

      tablaBody.innerHTML = data.map((p) => {
        const fecha = p.created_at
          ? new Date(p.created_at).toLocaleString("es-MX")
          : "";

        return `
          <tr>
            <td>${escapeHtml(p.nombre)}</td>
            <td>${escapeHtml(p.telefono)}</td>
            <td>${escapeHtml(p.vehiculo)}</td>
            <td>${escapeHtml(p.comentario)}</td>
            <td>${fecha}</td>
            <td>
              <button class="btn btn-danger btn-delete" data-id="${p.id}" data-nombre="${escapeHtml(p.nombre)}">
                Eliminar
              </button>
            </td>
          </tr>
        `;
      }).join("");

      document.querySelectorAll(".btn-delete").forEach((btn) => {
        btn.addEventListener("click", () => {
          eliminarProspecto(btn.dataset.id, btn.dataset.nombre);
        });
      });

    } catch (error) {
      console.error(error);
      tablaBody.innerHTML = `
        <tr>
          <td colspan="6" class="loading-cell">Error al cargar prospectos.</td>
        </tr>
      `;
    }
  }

  async function revisarSesion() {
    try {
      const { data, error } = await window.db.auth.getSession();
      if (error) throw error;

      if (data?.session) {
        mostrarPanel();
        cargarProspectos();
      } else {
        mostrarLogin();
      }
    } catch (error) {
      console.error(error);
      mostrarLogin();
    }
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("adminEmail").value.trim();
      const password = document.getElementById("adminPassword").value.trim();
      const submitBtn = loginForm.querySelector("button[type='submit']");

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Entrando...";
        estadoLogin.textContent = "";

        const { error } = await window.db.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        mostrarPanel();
        cargarProspectos();
      } catch (error) {
        console.error(error);
        estadoLogin.textContent = "Correo o contraseña incorrectos.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Ingresar";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await window.db.auth.signOut();
      mostrarLogin();
    });
  }

  revisarSesion();
});
