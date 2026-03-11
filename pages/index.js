import { useState } from 'react'
import vehicles from '../data/vehicles'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/Home.module.css'

export default function Home() {

const [form,setForm]=useState({
nombre:'',
telefono:'',
ciudad:'',
vehiculo:'',
tipo_cliente:'',
uso_principal:'',
mensaje:'',
consentimiento:false
})

const [estado,setEstado]=useState('')
const [filtro,setFiltro]=useState('Todos')

const handleChange=(e)=>{
const{name,value,type,checked}=e.target
setForm({
...form,
[name]:type==='checkbox'?checked:value
})
}

const seleccionarVehiculo=(vehiculo)=>{
setForm({...form,vehiculo})

document.getElementById('formulario-contacto').scrollIntoView({
behavior:'smooth'
})
}

const vehiculosFiltrados=
filtro==='Todos'
?vehicles
:vehicles.filter(v=>v.categoria===filtro)

const handleSubmit=async(e)=>{
e.preventDefault()

if(!form.nombre||!form.telefono||!form.vehiculo){
setEstado('Completa los campos obligatorios')
return
}

const payload={
nombre:form.nombre,
telefono:form.telefono,
ciudad:form.ciudad,
vehiculo:form.vehiculo,
tipo_cliente:form.tipo_cliente,
uso_principal:form.uso_principal,
mensaje:form.mensaje,
consentimiento:form.consentimiento
}

const{error}=await supabase
.from('prospectos')
.insert([payload])

if(error){
setEstado('Error al enviar solicitud')
}else{
setEstado('Solicitud enviada correctamente')

setForm({
nombre:'',
telefono:'',
ciudad:'',
vehiculo:'',
tipo_cliente:'',
uso_principal:'',
mensaje:'',
consentimiento:false
})
}
}

return(

<div className={styles.container}>

<header className={styles.hero}>

<p className={styles.badge}>
Asesor Profesional Ford
</p>

<h1>
Diego Valenzuela
</h1>

<p className={styles.subtitle}>
Parral Chihuahua
</p>

<p className={styles.phone}>
Teléfono 6272850550
</p>

<div className={styles.botonesHero}>

<a
href="https://wa.me/526272850550"
target="_blank"
>
WhatsApp
</a>

<a
href="tel:6272850550"
>
Llamar
</a>

</div>

</header>

<section className={styles.legal}>

Precios sujetos a cambio sin previo aviso.
Imágenes ilustrativas.
Disponibilidad sujeta a inventario.

</section>

<section className={styles.presentacion}>

<div className={styles.presentacionCard}>

<h2>
Tu asesor Ford
</h2>

<p>
Te ayudo a encontrar la unidad ideal
para trabajo, familia o negocio.
</p>

</div>

</section>

<section id="catalogo" className={styles.catalogo}>

<div className={styles.catalogoHeader}>

<h2>Catálogo Ford</h2>

<div className={styles.filtros}>

<button
onClick={()=>setFiltro('Todos')}
className={filtro==='Todos'?styles.activo:''}
>
Todos
</button>

<button
onClick={()=>setFiltro('Pickup')}
className={filtro==='Pickup'?styles.activo:''}
>
Pickups
</button>

<button
onClick={()=>setFiltro('SUV')}
className={filtro==='SUV'?styles.activo:''}
>
SUV
</button>

<button
onClick={()=>setFiltro('Deportivo')}
className={filtro==='Deportivo'?styles.activo:''}
>
Deportivos
</button>

</div>

</div>

<div className={styles.grid}>

{vehiculosFiltrados.map(v=>(

<div className={styles.card} key={v.id}>

<img
src={v.imagen}
alt={v.nombre}
className={styles.imagen}
onError={(e)=>{
e.currentTarget.src='/img/placeholder.jpg'
}}
/>

<div className={styles.cardBody}>

<span className={styles.categoria}>
{v.categoria}
</span>

<h3>
{v.nombre}
</h3>

<p>
{v.descripcion}
</p>

<p className={styles.precio}>
{v.precio}
</p>

<div className={styles.cardActions}>

<button
onClick={()=>seleccionarVehiculo(v.nombre)}
>
Solicitar info
</button>

<a
href={`https://wa.me/526272850550?text=Hola Diego me interesa ${v.nombre}`}
target="_blank"
>
WhatsApp
</a>

</div>

</div>

</div>

))}

</div>

</section>

<section
id="formulario-contacto"
className={styles.formSection}
>

<div className={styles.formWrap}>

<h2>Solicitar información</h2>

<form className={styles.form} onSubmit={handleSubmit}>

<input
name="nombre"
placeholder="Nombre"
value={form.nombre}
onChange={handleChange}
/>

<input
name="telefono"
placeholder="Teléfono"
value={form.telefono}
onChange={handleChange}
/>

<input
name="ciudad"
placeholder="Ciudad"
value={form.ciudad}
onChange={handleChange}
/>

<select
name="vehiculo"
value={form.vehiculo}
onChange={handleChange}
>

<option value="">Selecciona vehículo</option>

{vehicles.map(v=>(
<option key={v.id} value={v.nombre}>
{v.nombre}
</option>
))}

</select>

<select
name="tipo_cliente"
value={form.tipo_cliente}
onChange={handleChange}
>

<option value="">Tipo cliente</option>
<option>Frío</option>
<option>Templado</option>
<option>Caliente</option>

</select>

<select
name="uso_principal"
value={form.uso_principal}
onChange={handleChange}
>

<option value="">Uso</option>
<option>Trabajo</option>
<option>Familia</option>
<option>Negocio</option>
<option>Personal</option>

</select>

<textarea
name="mensaje"
placeholder="Mensaje"
value={form.mensaje}
onChange={handleChange}
/>

<label className={styles.check}>

<input
type="checkbox"
name="consentimiento"
checked={form.consentimiento}
onChange={handleChange}
/>

Acepto aviso de privacidad

</label>

<button type="submit">
Enviar solicitud
</button>

{estado && <p className={styles.estado}>{estado}</p>}

</form>

</div>

</section>

<footer className={styles.footer}>

Diego Valenzuela  
Asesor Ford Parral  

</footer>

</div>

)
}
