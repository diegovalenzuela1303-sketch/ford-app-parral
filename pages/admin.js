import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/Admin.module.css'

export default function Admin(){

const [password,setPassword]=useState('')
const [acceso,setAcceso]=useState(false)
const [prospectos,setProspectos]=useState([])

const login=()=>{
if(password==='FordParral2026!'){
setAcceso(true)
cargarProspectos()
}else{
alert('Contraseña incorrecta')
}
}

const cargarProspectos=async()=>{
const{data,error}=await supabase
.from('prospectos')
.select('*')
.order('created_at',{ascending:false})

if(!error){
setProspectos(data)
}
}

const eliminar=async(id)=>{
if(!confirm('Eliminar prospecto?')) return

await supabase
.from('prospectos')
.delete()
.eq('id',id)

cargarProspectos()
}

const cambiarEstado=async(id,estado)=>{

await supabase
.from('prospectos')
.update({tipo_cliente:estado})
.eq('id',id)

cargarProspectos()
}

const exportarCSV=()=>{

let csv="Nombre,Telefono,Ciudad,Vehiculo,Estado,Fecha\n"

prospectos.forEach(p=>{
csv+=`${p.nombre},${p.telefono},${p.ciudad},${p.vehiculo},${p.tipo_cliente},${p.created_at}\n`
})

const blob=new Blob([csv],{type:'text/csv'})
const url=URL.createObjectURL(blob)

const a=document.createElement('a')
a.href=url
a.download='prospectos.csv'
a.click()

}

if(!acceso){
return(
<div className={styles.login}>

<h1>Admin Ford</h1>

<input
type="password"
placeholder="Contraseña"
value={password}
onChange={e=>setPassword(e.target.value)}
/>

<button onClick={login}>
Entrar
</button>

</div>
)
}

return(

<div className={styles.admin}>

<h1>Panel de Prospectos</h1>

<div className={styles.topbar}>

<p>
Total prospectos: <b>{prospectos.length}</b>
</p>

<button onClick={exportarCSV}>
Exportar Excel
</button>

</div>

<table className={styles.table}>

<thead>
<tr>

<th>Nombre</th>
<th>Telefono</th>
<th>Ciudad</th>
<th>Vehiculo</th>
<th>Estado</th>
<th>Fecha</th>
<th>Acciones</th>

</tr>
</thead>

<tbody>

{prospectos.map(p=>(

<tr key={p.id}>

<td>{p.nombre}</td>
<td>{p.telefono}</td>
<td>{p.ciudad}</td>
<td>{p.vehiculo}</td>

<td>

<select
value={p.tipo_cliente||''}
onChange={(e)=>cambiarEstado(p.id,e.target.value)}
>

<option value="">Sin estado</option>
<option value="Frío">Frío</option>
<option value="Templado">Templado</option>
<option value="Caliente">Caliente</option>
<option value="Vendido">Vendido</option>

</select>

</td>

<td>
{new Date(p.created_at).toLocaleDateString()}
</td>

<td>

<button
onClick={()=>eliminar(p.id)}
>
Eliminar
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)
}
