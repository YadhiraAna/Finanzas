'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';

interface MenuItem {
  label: string;
  href: string;
}

interface HeaderProps {
  menuItems?: MenuItem[];
}

export function Header({ menuItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const defaultMenuItems: MenuItem[] = [
    { label: 'Registro Presupuestal', href: '/registro-presupuestal' },
    { label: 'Registro de Gastos', href: '/registro-gastos' },
    { label: 'Registro Ingreso extra', href: '/registro-ingreso' },
    { label: 'Reportes', href: '/reportes' },
    { label: 'Agregar Comentario', href: '/comentario' },
    { label: 'Salir', href: '/' },
  ];

  const items = menuItems || defaultMenuItems;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <Link href="/dashboard" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="white" stroke="#14b8a6" strokeWidth="2"/>
              <circle cx="20" cy="18" r="12" fill="#14b8a6"/>
              <ellipse cx="20" cy="25" rx="8" ry="3" fill="#14b8a6"/>
              <circle cx="15" cy="16" r="2" fill="white"/>
              <circle cx="25" cy="16" r="2" fill="white"/>
              <path d="M 18 21 Q 20 23 22 21" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <rect x="18" y="8" width="4" height="4" rx="1" fill="#14b8a6"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Pesito</span>
            <span className={styles.logoSubtitle}>a Pesito</span>
          </div>
        </Link>

        {/* Menu Button */}
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
          <span className={styles.menuLine}></span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div 
            className={styles.overlay} 
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className={styles.dropdown}>
            {items.map((item, index) => (
              <Link
                key={index}
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