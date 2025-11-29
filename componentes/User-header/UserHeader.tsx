'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

interface MenuItem {
  label: string;
  href: string;
}

export function Header({ menuItems }: { menuItems?: MenuItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = menuItems || [
    { label: 'Registro Presupuestal', href: '/registro-presupuestal' },
    { label: 'Registro de Gastos', href: '/registro-gastos' },
    { label: 'Registro Ingreso extra', href: '/registro-ingreso' },
    { label: 'Reportes', href: '/reportes' },
    { label: 'Agregar Comentario', href: '/comentario' },
    { label: 'Regresar', href: '/' },
  ];

  return (
    <header className={styles['site-header']}>
      <nav className={styles.nav}>

        {/* LOGO */}
        <div className={styles.brand}>
          <Link href="/dashboard">
            <img src="/pesito.png" alt="Pesito a Pesito" className={styles['logo-img']} />
          </Link>
        </div>

        {/* BOTÓN MENÚ */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </button>
      </nav>

      {/* MENÚ DESPLEGABLE */}
      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />

          <nav className={styles.dropdown}>
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={styles.menuItem}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
