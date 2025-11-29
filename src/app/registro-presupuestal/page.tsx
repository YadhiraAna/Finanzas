'use client';

import { Header } from '@/componentes/User-header/UserHeader';
import styles from '../registro-presupuestal/registro-presupuestal.module.css';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Categoria {
  id: string;
  nombre: string;
  cantidad: number;
  porcentaje: number;
  color: string;
}

const COLORES = ['#14b8a6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

export default function RegistroPresupuestalPage() {
  const [presupuesto, setPresupuesto] = useState<number>(5000000);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<string>('Mensual');
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: '1', nombre: 'Comida', cantidad: 1500, porcentaje: 30, color: '#14b8a6' },
    { id: '2', nombre: 'Transporte', cantidad: 600, porcentaje: 12, color: '#ef4444' },
    { id: '3', nombre: 'Servicios', cantidad: 500, porcentaje: 10, color: '#10b981' },
    { id: '4', nombre: 'Otros', cantidad: 1000, porcentaje: 20, color: '#f59e0b' },
  ]);

  const calcularPorcentajes = (cats: Categoria[], total: number) => {
    return cats.map(cat => ({
      ...cat,
      porcentaje: total > 0 ? Math.round((cat.cantidad / total) * 100) : 0
    }));
  };

  const handleCantidadChange = (id: string, nuevaCantidad: number) => {
    const nuevasCategorias = categorias.map(cat =>
      cat.id === id ? { ...cat, cantidad: nuevaCantidad } : cat
    );
    setCategorias(calcularPorcentajes(nuevasCategorias, presupuesto));
  };

  const handleAgregarCategoria = () => {
    const nuevaCategoria: Categoria = {
      id: Date.now().toString(),
      nombre: 'Nueva Categoría',
      cantidad: 0,
      porcentaje: 0,
      color: COLORES[categorias.length % COLORES.length]
    };
    setCategorias([...categorias, nuevaCategoria]);
  };

  const handleEliminarCategoria = (id: string) => {
    const nuevasCategorias = categorias.filter(cat => cat.id !== id);
    setCategorias(calcularPorcentajes(nuevasCategorias, presupuesto));
  };

  const handleNombreChange = (id: string, nuevoNombre: string) => {
    setCategorias(categorias.map(cat =>
      cat.id === id ? { ...cat, nombre: nuevoNombre } : cat
    ));
  };

  const handlePresupuestoChange = (nuevoPresupuesto: number) => {
    setPresupuesto(nuevoPresupuesto);
    setCategorias(calcularPorcentajes(categorias, nuevoPresupuesto));
  };

  const totalGastado = categorias.reduce((sum, cat) => sum + cat.cantidad, 0);
  const ahorroEstimado = presupuesto - totalGastado;
  const porcentajeAhorro = presupuesto > 0 ? Math.round((ahorroEstimado / presupuesto) * 100) : 0;

  const datosGrafico = categorias.map(cat => ({
    name: cat.nombre,
    value: cat.cantidad,
    porcentaje: cat.porcentaje
  }));

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <div className={styles.mainContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>Estimacion de presupuesto total</h1>

          <div className={styles.layoutGrid}>
            {/* Sección Izquierda */}
            <div className={styles.leftSection}>
              {/* Presupuesto y Período */}
              <div className={styles.presupuestoSection}>
                <div className={styles.presupuestoGroup}>
                  <label className={styles.label}>Presupuesto</label>
                  <input
                    type="number"
                    value={presupuesto}
                    onChange={(e) => handlePresupuestoChange(Number(e.target.value))}
                    className={styles.presupuestoInput}
                  />
                </div>

                <div className={styles.periodoGroup}>
                  <label className={styles.label}>Seleccione una opción</label>
                  <div className={styles.periodoBotones}>
                    {['Mensual', 'Quincenal', 'Semanal'].map(periodo => (
                      <button
                        key={periodo}
                        onClick={() => setPeriodoSeleccionado(periodo)}
                        className={`${styles.periodoBoton} ${periodoSeleccionado === periodo ? styles.periodoActivo : ''}`}
                      >
                        {periodo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabla de Categorías */}
              <div className={styles.tablaContainer}>
                <table className={styles.tabla}>
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th>Cantidad $</th>
                      <th>Porcentaje %</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorias.map(categoria => (
                      <tr key={categoria.id}>
                        <td>
                          <input
                            type="text"
                            value={categoria.nombre}
                            onChange={(e) => handleNombreChange(categoria.id, e.target.value)}
                            className={styles.inputCategoria}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={categoria.cantidad}
                            onChange={(e) => handleCantidadChange(categoria.id, Number(e.target.value))}
                            className={styles.inputCantidad}
                          />
                        </td>
                        <td className={styles.porcentajeCell}>{categoria.porcentaje}%</td>
                        <td>
                          <button
                            onClick={() => handleEliminarCategoria(categoria.id)}
                            className={styles.botonEliminar}
                            title="Eliminar categoría"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button onClick={handleAgregarCategoria} className={styles.agregarCategoria}>
                  +Agregar categoría
                </button>
              </div>

              {/* Resumen de Ahorro */}
              <div className={styles.resumenAhorro}>
                <p>
                  En este tiempo asignado estaria ahorrando <strong>${ahorroEstimado.toLocaleString()}</strong> pesos 
                  siendo un <strong>{porcentajeAhorro}%</strong> de su cantidad ingresada
                </p>
              </div>
            </div>

            {/* Sección Derecha - Gráfico */}
            <div className={styles.rightSection}>
              <div className={styles.graficoContainer}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosGrafico}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {datosGrafico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categorias[index].color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Leyenda personalizada */}
                <div className={styles.leyenda}>
                  {categorias.map((cat) => (
                    <div key={cat.id} className={styles.leyendaItem}>
                      <div 
                        className={styles.colorIndicador}
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className={styles.leyendaPorcentaje}>{cat.porcentaje}%</span>
                      <span className={styles.leyendaNombre}>{cat.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}