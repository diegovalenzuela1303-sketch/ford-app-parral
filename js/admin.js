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

const { error } = await window.db
.from("prospectos")
.delete()
.eq("id", id);

if (error) {
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
alert("No se pudo actualizar");
return;
}

cargarProspectos();

}

async function cargarProspectos() {

tablaBody.innerHTML = `
<tr>
<td colspan="6">Cargando prospectos...</td>
</tr>
`;

const { data, error } = await window.db
.from("prospectos")
.select("*")
.order("created_at", { ascending: false });

if (error) {
tablaBody.innerHTML = `
<tr>
<td colspan="6">Error al cargar prospectos</td>
</tr>
`;
return;
}

totalProspectos.textContent = data.length;

if (!data.length) {

tablaBody.innerHTML = `
<tr>
<td colspan="6">No hay prospectos</td>
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

<td>

${p.revisado ? "✅ Revisado" : "🟡 Nuevo"}

</td>

<td>

<button class="btn btn-dark btn-revisado"
data-id="${p.id}">
Revisado
</button>

<button class="btn btn-danger btn-delete"
data-id="${p.id}"
data-nombre="${escapeHtml(p.nombre)}">
Eliminar
</button>

</td>

</tr>
`;

}).join("");

document.querySelectorAll(".btn-delete").forEach((btn) => {

btn.addEventListener("click", () => {

eliminarProspecto(
btn.dataset.id,
btn.dataset.nombre
);

});

});

document.querySelectorAll(".btn-revisado").forEach((btn) => {

btn.addEventListener("click", () => {

marcarRevisado(btn.dataset.id);

});

});

}

async function revisarSesion() {

const { data } = await window.db.auth.getSession();

if (data?.session) {
mostrarPanel();
cargarProspectos();
} else {
mostrarLogin();
}

}

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("adminEmail").value.trim();
const password = document.getElementById("adminPassword").value.trim();

const { error } = await window.db.auth.signInWithPassword({
email,
password
});

if (error) {
estadoLogin.textContent = "Correo o contraseña incorrectos";
return;
}

mostrarPanel();
cargarProspectos();

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
