'use client';

import Link from 'next/link';
import styles from '../src/app/dashboard/dashboard.module.css';



interface Action {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface QuickActionsProps {
  actions: Action[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className={styles.cardTitle}>Acciones rápidas</h2>
      <p className={styles.quickActionsDescription}>
        Atajos para lo que usarás más en clase.
      </p>
      
      <div className={styles.actionsList}>
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={styles.actionButton}
          >
            {action.icon}
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}