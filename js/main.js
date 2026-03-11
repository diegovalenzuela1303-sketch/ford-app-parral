document.addEventListener("DOMContentLoaded", () => {

const catalogo = document.getElementById("catalogo-lista");

function placeholder(nombre){

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700">
<rect width="100%" height="100%" fill="#0f172a"/>
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
font-size="40" fill="#ffffff" font-family="Arial">
${nombre}
</text>
</svg>
`;

return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg)

}

function crearCard(v){

const imagen = v.imagen && v.imagen !== "" ? v.imagen : placeholder(v.nombre)

return `
<div class="vehiculo-card">

<div class="vehiculo-img-wrap">
<img src="${imagen}" alt="${v.nombre}">
</div>

<div class="vehiculo-info">

<h3>${v.nombre}</h3>

<p>${v.descripcion}</p>

<div class="ficha-tecnica">

<ul>
<li><b>Motor:</b> ${v.ficha.motor}</li>
<li><b>Transmisión:</b> ${v.ficha.transmision}</li>
<li><b>Tracción:</b> ${v.ficha.traccion}</li>
<li><b>Enfoque:</b> ${v.ficha.enfoque}</li>
</ul>

</div>

<a class="btn btn-whatsapp"
href="https://wa.me/526272850550?text=Hola Diego, me interesa ${v.nombre}"
target="_blank">

WhatsApp

</a>

</div>

</div>
`

}

catalogo.innerHTML = window.VEHICULOS.map(crearCard).join("")

})
