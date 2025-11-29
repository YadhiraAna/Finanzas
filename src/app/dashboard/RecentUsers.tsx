 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, User } from 'lucide-react';
import styles from './dashboard.module.css';

type AdminUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  disabled: boolean;
  creationTime: string;
  lastSignInTime: string | null;
};

export default function RecentUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setErr(null);
        setLoading(true);
        const res = await fetch("/api/admin/users");

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? `Error ${res.status}`);
        }

        const data = await res.json();
        const all: AdminUser[] = data.users ?? [];

        // Ordenamos por lastSignInTime descendente
        const sorted = [...all].sort((a, b) => {
          const ta = a.lastSignInTime ? Date.parse(a.lastSignInTime) : 0;
          const tb = b.lastSignInTime ? Date.parse(b.lastSignInTime) : 0;
          return tb - ta;
        });

        // Nos quedamos con los primeros 3
        setUsers(sorted.slice(0, 3));
      } catch (e: unknown) {
        setErr( "Error al cargar usuarios recientes");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingCard}>
        <p className={styles.loadingText}>Cargando usuarios recientes...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className={styles.errorCard}>
        <p className={styles.errorText}>{err}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.emptyCard}>
        <p className={styles.emptyText}>
          No hay usuarios aún. Pídele a alguien que se registre 😊
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Lista de usuarios */}
      <div className={styles.usersList}>
        {users.map((u) => (
          <div key={u.uid} className={styles.userCard}>
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                <User className={styles.userAvatarIcon} size={24} />
              </div>
              <div>
                <p className={styles.userNameText}>
                  {u.displayName ?? u.email ?? <span style={{ fontStyle: 'italic', color: '#9ca3af' }}>Sin nombre</span>}
                </p>
                <p className={styles.userEmail}>
                  {u.email ?? "Sin email"}
                </p>
              </div>
            </div>
            <div className={styles.userDate}>
              <p>
                {u.lastSignInTime
                  ? new Date(u.lastSignInTime).toLocaleDateString("es-MX")
                  : "Nunca"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Link a todos los usuarios */}
      <Link href="/dashboard/users" className={styles.viewAllLink}>
        Ver todos los usuarios
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}