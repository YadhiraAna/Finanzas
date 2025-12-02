'use client';
import { Header } from '@/componentes/User-header/UserHeader';
import styles from './reportes.module.css';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReportesPage() {
  const [vistaActiva, setVistaActiva] = useState<'gastos' | 'ingresos'>('ingresos');
  const [periodo, setPeriodo] = useState('Meses');
  const [paginaActual, setPaginaActual] = useState(0);

  // Datos de Ingresos
  const datosIngresos = [
    { fuente: 'Deposito por cuidar perros', monto: '$100', fecha: '17/09/2025', descripcion: 'Dinero obtenido por vender ropa.', tipo: 'Tarjeta' },
    { fuente: 'Deuda de Yahir', monto: '$200', fecha: '25/09/2025', descripcion: 'Reembolso de compra cancelada', tipo: 'Efectivo' },
    { fuente: 'Quincena', monto: '$200', fecha: '30/09/2025', descripcion: 'Ingreso por cuidar niños el fin de semana', tipo: 'Cheque' },
    { fuente: 'Pago de venta de dulces', monto: '$498', fecha: '01/10/2025', descripcion: 'Ingreso por vender postres caseros', tipo: 'Tarjeta' },
  ];

  // Datos de Gastos
  const datosGastos = [
    { categoria: 'Transporte', gasto: '$100', presupuesto: '$120', porcentaje: '83.3 %', estado: 'dentro', icono: '✓' },
    { categoria: 'Alimento', gasto: '$200', presupuesto: '$150', porcentaje: '133.3 %', estado: 'excedido', icono: '✗' },
    { categoria: 'Alquiler', gasto: '$2,000', presupuesto: '$3,000', porcentaje: '66.6 %', estado: 'dentro', icono: '✓' },
    { categoria: 'Croquetas', gasto: '$498', presupuesto: '$500', porcentaje: '99.6 %', estado: 'riesgo', icono: '⚠' },
  ];

  // Datos gráfico de ingresos (línea simple)
  const datosGraficoIngresos = [
    { mes: 'Ene', valor: 30 },
    { mes: 'Feb', valor: 60 },
    { mes: 'Mar', valor: 10 },
    { mes: 'Abr', valor: 40 },
    { mes: 'May', valor: 60 },
    { mes: 'Jun', valor: 20 },
    { mes: 'Jul', valor: 30 },
    { mes: 'Ago', valor: 90 },
    { mes: 'Sep', valor: 30 },
    { mes: 'Oct', valor: 40 },
    { mes: 'Nov', valor: 10 },
    { mes: 'Dic', valor: 50 },
  ];

  // Datos gráfico de gastos (líneas múltiples)
  const datosGraficoGastos = [
    { mes: 'Ene', transporte: 30, alimento: 10, alquiler: 50, croquetas: 40 },
    { mes: 'Feb', transporte: 60, alimento: 40, alquiler: 10, croquetas: 50 },
    { mes: 'Mar', transporte: 10, alimento: 30, alquiler: 80, croquetas: 50 },
    { mes: 'Abr', transporte: 40, alimento: 20, alquiler: 60, croquetas: 10 },
    { mes: 'May', transporte: 80, alimento: 40, alquiler: 20, croquetas: 50 },
    { mes: 'Jun', transporte: 40, alimento: 10, alquiler: 30, croquetas: 40 },
    { mes: 'Jul', transporte: 20, alimento: 50, alquiler: 90, croquetas: 20 },
    { mes: 'Ago', transporte: 60, alimento: 70, alquiler: 60, croquetas: 10 },
    { mes: 'Sep', transporte: 20, alimento: 50, alquiler: 30, croquetas: 40 },
    { mes: 'Oct', transporte: 60, alimento: 20, alquiler: 80, croquetas: 60 },
    { mes: 'Nov', transporte: 30, alimento: 10, alquiler: 30, croquetas: 20 },
    { mes: 'Dic', transporte: 50, alimento: 10, alquiler: 50, croquetas: 10 },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <div className={styles.container}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${vistaActiva === 'gastos' ? styles.tabActivo : ''}`}
            onClick={() => setVistaActiva('gastos')}
          >
            Gastos
          </button>
          <button
            className={`${styles.tab} ${vistaActiva === 'ingresos' ? styles.tabActivo : ''}`}
            onClick={() => setVistaActiva('ingresos')}
          >
            Ingresos
          </button>
        </div>

        {/* Vista de Ingresos */}
        {vistaActiva === 'ingresos' && (
          <div className={styles.contenido}>
            {/* Tabla de Ingresos */}
            <div className={styles.tablaWrapper}>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>FUENTE</th>
                    <th>MONTO</th>
                    <th>FECHA</th>
                    <th>DESCRIPCION</th>
                    <th>TIPO</th>
                  </tr>
                </thead>
                <tbody>
                  {datosIngresos.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fuente}</td>
                      <td>{item.monto}</td>
                      <td>{item.fecha}</td>
                      <td>{item.descripcion}</td>
                      <td>{item.tipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Controles de paginación */}
              <div className={styles.controles}>
                <div className={styles.paginacion}>
                  <span className={`${styles.dot} ${styles.dotActivo}`}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>

                <div className={styles.flechas}>
                  <button className={styles.flechaBtn}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className={styles.flechaBtn}>
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Gráfico de Ingresos */}
            <div className={styles.graficoSeccion}>
              <div className={styles.filtro}>
                <label>Ver datos por:</label>
                <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={styles.select}>
                  <option value="Meses">Meses</option>
                  <option value="Semanas">Semanas</option>
                  <option value="Dias">Dias</option>
                </select>
              </div>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={datosGraficoIngresos}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="valor" stroke="#14b8a6" strokeWidth={2} dot={{ fill: '#14b8a6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Vista de Gastos */}
        {vistaActiva === 'gastos' && (
          <div className={styles.contenido}>
            {/* Tabla de Gastos */}
            <div className={styles.tablaWrapper}>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>CATEGORÍA</th>
                    <th>GASTO</th>
                    <th>PRESUPUESTO</th>
                    <th>PORCENTAJE USADO</th>
                    <th>ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {datosGastos.map((item, index) => (
                    <tr key={index}>
                      <td>{item.categoria}</td>
                      <td>{item.gasto}</td>
                      <td>{item.presupuesto}</td>
                      <td>{item.porcentaje}</td>
                      <td className={styles.estadoCell}>
                        <div className={styles[`estado-${item.estado}`]}>
                          {item.estado === 'dentro' && 'Dentro del presupuesto'}
                          {item.estado === 'excedido' && 'Excedido'}
                          {item.estado === 'riesgo' && 'En riesgo'}
                          <span className={styles.estadoIcono}>{item.icono}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Controles de paginación */}
              <div className={styles.controles}>
                <div className={styles.paginacion}>
                  <span className={`${styles.dot} ${styles.dotActivo}`}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>

                <div className={styles.flechas}>
                  <button className={styles.flechaBtn}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className={styles.flechaBtn}>
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Gráficos de Gastos */}
            <div className={styles.gastosGraficos}>
              {/* Gráfico de líneas múltiples */}
              <div className={styles.graficoMultiple}>
                <div className={styles.filtro}>
                  <label>Ver datos por:</label>
                  <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className={styles.select}>
                    <option value="Meses">Meses</option>
                    <option value="Semanas">Semanas</option>
                    <option value="Dias">Dias</option>
                  </select>
                </div>

                <div className={styles.leyendaLineas}>
                  <div><span style={{color: '#f59e0b'}}>—</span> Transporte</div>
                  <div><span style={{color: '#10b981'}}>—</span> Alimento</div>
                  <div><span style={{color: '#14b8a6'}}>—</span> Alquiler</div>
                  <div><span style={{color: '#6b7280'}}>—</span> Croquetas</div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={datosGraficoGastos}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="transporte" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="alimento" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="alquiler" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="croquetas" stroke="#6b7280" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Gráfico circular (donut) */}
              <div className={styles.graficoCircular}>
                <div className={styles.donut}>
                  <svg viewBox="0 0 200 200" className={styles.donutSvg}>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="30" strokeDasharray="251 502" transform="rotate(-90 100 100)" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" strokeWidth="30" strokeDasharray="167 502" strokeDashoffset="-251" transform="rotate(-90 100 100)" />
                  </svg>
                </div>

                <div className={styles.porcentajes}>
                  <div className={styles.porcentajeItem}>
                    <div className={styles.porcentajeValor} style={{color: '#374151'}}>83.3%</div>
                    <div className={styles.porcentajeLabel} style={{borderBottom: '3px solid #10b981'}}>Transporte</div>
                  </div>

                  <div className={styles.porcentajeItem}>
                    <div className={styles.porcentajeValor} style={{color: '#ef4444'}}>133.3%</div>
                    <div className={styles.porcentajeLabel} style={{borderBottom: '3px solid #ef4444'}}>Alimento</div>
                  </div>
                </div>

                <div className={styles.indicadoresPag}>
                  <button className={styles.indBtn}></button>
                  <button className={`${styles.indBtn} ${styles.indActivo}`}></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}