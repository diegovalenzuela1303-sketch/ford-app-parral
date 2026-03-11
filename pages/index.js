import { useState } from 'react'
import vehicles from '../data/vehicles'
import { supabase } from '../lib/supabaseClient'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    vehiculo: '',
    tipo_cliente: '',
    uso_principal: '',
    mensaje: '',
    consentimiento: false
  })

  const [estado, setEstado] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const seleccionarVehiculo = (vehiculo) => {
    setForm({ ...form, vehiculo })

    const formulario = document.getElementById('formulario-contacto')
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const vehiculosFiltrados =
    filtro === 'Todos'
      ? vehicles
      : vehicles.filter((v) => v.categoria === filtro)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.nombre || !form.telefono || !form.vehiculo) {
      setEstado('Completa los campos obligatorios')
      return
    }

    const payload = {
      nombre: form.nombre,
      telefono: form.telefono,
      ciudad: form.ciudad,
      vehiculo: form.vehiculo,
      tipo_cliente: form.tipo_cliente,
      uso_principal: form.uso_principal,
      mensaje: form.mensaje,
      consentimiento: form.consentimiento
    }

    const { error } = await supabase
      .from('prospectos')
      .insert([payload])

    if (error) {
      setEstado('Error al enviar solicitud')
    } else {
      setEstado('Solicitud enviada correctamente')

      setForm({
        nombre: '',
        telefono: '',
        ciudad: '',
        vehiculo: '',
        tipo_cliente: '',
        uso_principal: '',
        mensaje: '',
        consentimiento: false
      })
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay}>
          <p className={styles.badge}>Asesor Profesional Ford</p>
          <h1>Diego Valenzuela</h1>
          <p className={styles.subtitle}>
            Atención profesional en Parral, Chihuahua y la región
          </p>
          <p className={styles.phone}>Teléfono: 6272850550</p>
          <p className={styles.heroText}>
            Encuentra tu próximo Ford con asesoría profesional, atención cercana
            y seguimiento real para trabajo, familia o negocio.
          </p>

          <div className={styles.botonesHero}>
            <a href="https://wa.me/526272850550" target="_blank" rel="noreferrer">
              WhatsApp
            </a>

            <a href="tel:6272850550">
              Llamar
            </a>

            <a href="#catalogo">
              Ver catálogo
            </a>
          </div>
        </div>
      </header>

      <section className={styles.legal}>
        <p>
          Precios sujetos a cambio sin previo aviso. Imágenes ilustrativas.
          Disponibilidad sujeta a inventario. Las especificaciones pueden variar según versión.
        </p>
      </section>

      <section className={styles.presentacion}>
        <div className={styles.presentacionCard}>
          <h2>Tu asesor Ford en Parral</h2>
          <p>
            Te ayudo a encontrar la unidad ideal para trabajo, familia, negocio,
            uso personal o aventura, con atención profesional y seguimiento directo.
          </p>
        </div>

        <div className={styles.presentacionGrid}>
          <div className={styles.infoBox}>
            <h3>Atención personalizada</h3>
            <p>Te ayudo a elegir la unidad correcta según tu necesidad real.</p>
          </div>

          <div className={styles.infoBox}>
            <h3>Seguimiento rápido</h3>
            <p>Recibe respuesta directa por WhatsApp o llamada.</p>
          </div>

          <div className={styles.infoBox}>
            <h3>Catálogo amplio</h3>
            <p>Revisa pickups, SUVs, deportivos y unidades comerciales.</p>
          </div>
        </div>
      </section>

      <section id="catalogo" className={styles.catalogo}>
        <div className={styles.catalogoHeader}>
          <div>
            <h2>Catálogo Ford</h2>
            <p className={styles.catalogoSub}>
              Explora las unidades disponibles y solicita información al instante.
            </p>
          </div>

          <div className={styles.filtros}>
            <button
              onClick={() => setFiltro('Todos')}
              className={filtro === 'Todos' ? styles.activo : ''}
            >
              Todos
            </button>

            <button
              onClick={() => setFiltro('Pickup')}
              className={filtro === 'Pickup' ? styles.activo : ''}
            >
              Pickups
            </button>

            <button
              onClick={() => setFiltro('SUV')}
              className={filtro === 'SUV' ? styles.activo : ''}
            >
              SUV
            </button>

            <button
              onClick={() => setFiltro('Deportivo')}
              className={filtro === 'Deportivo' ? styles.activo : ''}
            >
              Deportivos
            </button>

            <button
              onClick={() => setFiltro('Comercial')}
              className={filtro === 'Comercial' ? styles.activo : ''}
            >
              Comerciales
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {vehiculosFiltrados.map((v) => (
            <div className={styles.card} key={v.id}>
              <img
                src={v.imagen}
                alt={v.nombre}
                className={styles.imagen}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/img/placeholder.jpg'
                }}
              />

              <div className={styles.cardBody}>
                <span className={styles.categoria}>{v.categoria}</span>

                <h3>{v.nombre}</h3>

                <p>{v.descripcion}</p>

                <div className={styles.ficha}>
                  <p><strong>Motor:</strong> {v.ficha.motor}</p>
                  <p><strong>Transmisión:</strong> {v.ficha.transmision}</p>
                  <p><strong>Potencia:</strong> {v.ficha.potencia}</p>
                  <p><strong>Tracción:</strong> {v.ficha.traccion}</p>
                  <p><strong>Uso ideal:</strong> {v.ficha.uso}</p>
                </div>

                <p className={styles.precio}>{v.precio}</p>

                <div className={styles.cardActions}>
                  <button onClick={() => seleccionarVehiculo(v.nombre)}>
                    Solicitar info
                  </button>

                  <a
                    href={`https://wa.me/526272850550?text=${encodeURIComponent(`Hola Diego, me interesa ${v.nombre}`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={styles.ctaBandContent}>
          <h2>¿Buscas una Ford para trabajo, familia o negocio?</h2>
          <p>
            Déjame tus datos y te ayudo a encontrar la mejor opción para ti.
          </p>
        </div>
      </section>

      <section id="formulario-contacto" className={styles.formSection}>
        <div className={styles.formWrap}>
          <h2>Solicitar información</h2>
          <p className={styles.formText}>
            Completa tus datos y me pondré en contacto contigo.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name="nombre"
              placeholder="Nombre completo"
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

              {vehicles.map((v) => (
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
              <option value="">Tipo de cliente</option>
              <option value="Frío">Frío</option>
              <option value="Templado">Templado</option>
              <option value="Caliente">Caliente</option>
            </select>

            <select
              name="uso_principal"
              value={form.uso_principal}
              onChange={handleChange}
            >
              <option value="">Uso principal</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Familia">Familia</option>
              <option value="Negocio">Negocio</option>
              <option value="Personal">Personal</option>
              <option value="Aventura">Aventura</option>
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
              <span>
                Acepto el aviso de privacidad y autorizo el contacto comercial.
              </span>
            </label>

            <button type="submit">
              Enviar solicitud
            </button>

            {estado && <p className={styles.estado}>{estado}</p>}
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Diego Valenzuela | Asesor Profesional Ford | Parral, Chihuahua</p>
        <p>Teléfono: 6272850550</p>
        <p>Precios sujetos a cambio sin previo aviso.</p>
      </footer>
    </div>
  )
}
