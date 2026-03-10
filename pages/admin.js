import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/Admin.module.css';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [autorizado, setAutorizado] = useState(false);
  const [prospectos, setProspectos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const login = () => {
    if (password === 'FordParral2026!') {
      setAutorizado(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const cargarProspectos = async () => {
    const { data, error } = await supabase
      .from('prospectos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setProspectos(data || []);
    }
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este prospecto?');
    if (!confirmar) return;

    await supabase.from('prospectos').delete().eq('id', id);
    cargarProspectos();
  };

  useEffect(() => {
    if (autorizado) {
      cargarProspectos();
    }
  }, [autorizado]);

  const prospectosFiltrados = prospectos.filter((p) => {
    const texto = `${p.nombre || ''} ${p.telefono || ''} ${p.vehiculo || ''} ${p.ciudad || ''} ${p.tipo_cliente || ''}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });

  if (!autorizado) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginBox}>
          <h1>Admin Ford Parral</h1>
          <p>Ingresa la contraseña para ver prospectos.</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>Entrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <div className={styles.topbar}>
        <h1>Panel de Prospectos</h1>
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono, vehículo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Uso</th>
              <th>Mensaje</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {prospectosFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.created_at).toLocaleString()}</td>
                <td>{p.nombre}</td>
                <td>{p.telefono}</td>
                <td>{p.ciudad}</td>
                <td>{p.vehiculo}</td>
                <td>{p.tipo_cliente}</td>
                <td>{p.uso_principal}</td>
                <td>{p.mensaje}</td>
                <td>
                  <button onClick={() => eliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {prospectosFiltrados.length === 0 && (
          <p className={styles.vacio}>No hay prospectos para mostrar.</p>
        )}
      </div>
    </div>
  );
}
