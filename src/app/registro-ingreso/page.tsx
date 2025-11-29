
'use client'
import { Header } from '@/componentes/User-header/UserHeader';
import styles from './registro-ingreso.module.css';
import { useState } from 'react';

export default function RegistroIngresoPage() {
  const [formData, setFormData] = useState({
    monto: '100.00',
    tipo: 'efectivo',
    fuente: 'sueldo',
    fecha: '2025-09-13',
    descripcion: 'me debia mi hermano'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Ingreso extra registrado exitosamente');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <div className={styles.mainContainer}>
        {/* Contenido Principal */}
        <main className={styles.content}>
          <div className={styles.formCard}>
            <h1 className={styles.title}>REGISTRAR INGRESO EXTRA</h1>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Monto y Tipo */}
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Monto:</label>
                  <input
                    type="number"
                    name="monto"
                    step="0.01"
                    value={formData.monto}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tipo:</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="efectivo">efectivo</option>
                    <option value="trajeta">trajeta</option>
                  </select>
                </div>
              </div>

              {/* Fuente */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Fuente:</label>
                <select
                  name="fuente"
                  value={formData.fuente}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="sueldo">sueldo</option>
                  <option value="venta">venta</option>
                  <option value="inversion">inversion</option>
                  <option value="otro">otro</option>
                </select>
              </div>

              {/* Fecha */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Fecha:</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              {/* Descripción */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Descripcion:</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              {/* Botón Registrar */}
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}