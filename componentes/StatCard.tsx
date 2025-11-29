'use client';

import styles from '../src/app/dashboard/dashboard.module.css';


interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

export function StatCard({ icon, title, value, subtitle }: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIconWrapper}>
        <div className={styles.statIcon}>
          {icon}
        </div>
      </div>
      <p className={styles.statTitle}>{title}</p>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statSubtitle}>{subtitle}</p>
    </div>
  );
}