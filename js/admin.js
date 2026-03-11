document.addEventListener("DOMContentLoaded", () => {

const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

const loginBox = document.getElementById("loginBox");
const panelBox = document.getElementById("panelBox");

const tablaBody = document.getElementById("tablaProspectos");

const totalProspectos = document.getElementById("totalProspectos");
const prospectosHoy = document.getElementById("prospectosHoy");
const vehiculoTop = document.getElementById("vehiculoTop");

function mostrarLogin(){
loginBox.style.display="block"
panelBox.style.display="none"
}

function mostrarPanel(){
loginBox.style.display="none"
panelBox.style.display="block"
}

function escapeHtml(text){
const div=document.createElement("div")
div.textContent=text||""
return div.innerHTML
}

async function eliminarProspecto(id){

await window.db
.from("prospectos")
.delete()
.eq("id",id)

cargarProspectos()

}

async function marcarRevisado(id){

await window.db
.from("prospectos")
.update({revisado:true})
.eq("id",id)

cargarProspectos()

}

async function cargarProspectos(){

const {data,error}=await window.db
.from("prospectos")
.select("*")
.order("created_at",{ascending:false})

if(error)return

totalProspectos.textContent=data.length

const hoy=new Date().toISOString().slice(0,10)

const hoyCount=data.filter(p=>p.created_at?.slice(0,10)===hoy)

prospectosHoy.textContent=hoyCount.length

const conteoVehiculos={}

data.forEach(p=>{

if(!conteoVehiculos[p.vehiculo]){
conteoVehiculos[p.vehiculo]=0
}

conteoVehiculos[p.vehiculo]++

})

let top="-"
let max=0

for(const v in conteoVehiculos){

if(conteoVehiculos[v]>max){

max=conteoVehiculos[v]
top=v

}

}

vehiculoTop.textContent=top

tablaBody.innerHTML=data.map(p=>{

return`

<tr>

<td>${escapeHtml(p.nombre)}</td>

<td>${escapeHtml(p.telefono)}</td>

<td>${escapeHtml(p.vehiculo)}</td>

<td>${escapeHtml(p.comentario)}</td>

<td>${p.revisado?"✅ Revisado":"🟡 Nuevo"}</td>

<td>

<button class="btn btn-dark btn-revisado" data-id="${p.id}">
Revisado
</button>

<button class="btn btn-danger btn-delete" data-id="${p.id}">
Eliminar
</button>

</td>

</tr>

`

}).join("")

document.querySelectorAll(".btn-delete").forEach(btn=>{

btn.addEventListener("click",()=>{

eliminarProspecto(btn.dataset.id)

})

})

document.querySelectorAll(".btn-revisado").forEach(btn=>{

btn.addEventListener("click",()=>{

marcarRevisado(btn.dataset.id)

})

})

}

async function revisarSesion(){

const {data}=await window.db.auth.getSession()

if(data?.session){

mostrarPanel()
cargarProspectos()

}else{

mostrarLogin()

}

}

loginForm?.addEventListener("submit",async(e)=>{

e.preventDefault()

const email=document.getElementById("adminEmail").value
const password=document.getElementById("adminPassword").value

const {error}=await window.db.auth.signInWithPassword({
email,
password
})

if(!error){

mostrarPanel()
cargarProspectos()

}

})

logoutBtn?.addEventListener("click",async()=>{

await window.db.auth.signOut()
mostrarLogin()

})

revisarSesion()

})
