import Link from "next/link";
import { getServerUser } from "@/lib/auth-server";
import { Users, FolderOpen, FileText, Activity } from 'lucide-react';
import RecentUsers from "./RecentUsers";
import { StatCard } from "@/componentes/StatCard";
import { QuickActions } from "@/componentes/QuickActions";
import styles from './dashboard.module.css';

export const runtime = "nodejs";

export default async function DashboardPage() {
  const user = await getServerUser();

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Usuarios",
      value: "",
      subtitle: ""
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Categorías",
      value: "",
      subtitle: ""
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Publicaciones",
      value: "",
      subtitle: "Número de entradas (mock)."
    }
  ];

  const quickActions = [
    {
      href: '/dashboard/users',
      icon: <Users className="w-5 h-5" />,
      label: 'Ver usuarios',
    },
    {
      href: '/dashboard/categories',
      icon: <FolderOpen className="w-5 h-5" />,
      label: 'Administrar categorías',
    },
    {
      href: '/dashboard/activity',
      icon: <FileText className="w-5 h-5" />,
      label: 'Ver actividad reciente',
    },
  ];

  return (
    <>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>Panel de administración</h1>
          <button className={styles.menuButton}>Menu</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Welcome Message */}
          <section className={styles.welcomeSection}>
            <p className={styles.welcomeText}>
              {user ? (
                <>
                  Hola,{" "}
                  <span className={styles.userName}>
                    {user.displayName ?? user.email ?? user.uid}
                  </span>
                </>
              ) : (
                "Hola"
              )}
            </p>
            <p className={styles.description}>
              Desde aquí puedes revisar usuarios, categorías
            </p>
          </section>

          {/* Session Info */}
          {user && (
            <section className={styles.sessionSection}>
              <div className={styles.sessionCard}>
                <p className={styles.sessionLabel}>Sesión activa</p>
                <p className={styles.sessionEmail}>
                  {user.email ?? user.uid}
                </p>
              </div>
            </section>
          )}

          {/* Stats Grid */}
          <section className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
              />
            ))}
          </section>

          {/* Recent Users and Quick Actions */}
          <section className={styles.contentGrid}>
            {/* Usuarios recientes */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Usuarios recientes</h2>
              <RecentUsers />
            </div>

            {/* Acciones rápidas */}
            <div className={styles.card}>
              <QuickActions actions={quickActions} />
            </div>
          </section>

          {/* Error message */}
          {!user && (
            <p className={styles.noSessionError}>
              No hay sesión válida. Verifica el middleware o la cookie de sesión.
            </p>
          )}
        </div>
      </main>
    </>
  );
}