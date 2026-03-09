
import { useState } from "react";

const vehiclesBase = [
 { id:1, name:"Ford Territory", price:"$599,000", type:"SUV"},
 { id:2, name:"Ford Ranger", price:"$763,500", type:"Pickup"},
 { id:3, name:"Ford Ranger Raptor", price:"$1,313,500", type:"Pickup"},
 { id:4, name:"Ford Maverick", price:"$749,000", type:"Pickup"},
 { id:5, name:"Ford Bronco Sport", price:"$773,500", type:"SUV"},
 { id:6, name:"Ford Mustang", price:"$1,050,000", type:"Performance"},
];

export default function Home(){
 const [vehicles,setVehicles] = useState(vehiclesBase);
 const [admin,setAdmin] = useState(false);

 function updatePrice(id,value){
   setVehicles(v=>v.map(i=>i.id===id ? {...i,price:value}:i))
 }

 return(
   <div style={{fontFamily:"Arial",padding:40}}>
     <h1>Diego Valenzuela | Asesor Ford Parral</h1>
     <p>Contacto WhatsApp: 6272850550</p>

     <button onClick={()=>setAdmin(!admin)}>
       {admin ? "Salir Admin":"Modo Admin"}
     </button>

     <h2>Catálogo Ford</h2>

     {vehicles.map(v=>(
       <div key={v.id} style={{border:"1px solid #ddd",padding:15,marginTop:10}}>
         <h3>{v.name}</h3>
         <p>Tipo: {v.type}</p>
         <p>Precio: {v.price}</p>

         {admin && (
           <input
             value={v.price}
             onChange={e=>updatePrice(v.id,e.target.value)}
           />
         )}

         <br/>
         <a href={`https://wa.me/526272850550?text=Hola me interesa ${v.name}`}>
           Contactar por WhatsApp
         </a>
       </div>
     ))}
   </div>
 )
}
