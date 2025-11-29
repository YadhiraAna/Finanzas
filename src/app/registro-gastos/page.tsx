'use client';

import { Header } from '@/componentes/User-header/UserHeader';
import styles from '../registro-ingreso/registro-ingreso.module.css';

export default function RegistroGastosPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <div className={styles.mainContainer}>
        <main className={styles.content}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>REGISTRO DE GASTOS</h1>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              Página en construcción...
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}