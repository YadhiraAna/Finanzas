'use client';

import { Header } from '@/componentes/User-header/UserHeader';
import styles from './categories.module.css';
import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#14b8a6');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadCategories() {
    try {
      setErr(null);
      setLoading(true);
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? `Error ${res.status}`);
      }
      setCategories(data.categories ?? []);
    } catch (e: unknown) {
      setErr('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function resetForm() {
    setName('');
    setDescription('');
    setColor('#14b8a6');
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) {
      setErr('El nombre es obligatorio');
      return;
    }

    setSaving(true);
    setErr(null);
    try {
      const body = { name, description, color };
      let res: Response;

      if (editingId) {
        res = await fetch(`/api/categories/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? 'Error al guardar');
      }

      await loadCategories();
      resetForm();
    } catch (e: unknown) {
      setErr('Error al guardar categoría');
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(cat: Category) {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    setColor(cat.color || '#14b8a6');
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Seguro que quieres eliminar esta categoría?')) return;
    try {
      setErr(null);
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? 'Error al eliminar');
      }
      await loadCategories();
      if (editingId === id) {
        resetForm();
      }
    } catch (e: unknown) {
      setErr('Error al eliminar categoría');
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <div className={styles.container}>
        {/* Header Section */}
        <section className={styles.headerSection}>
          <div>
            <p className={styles.breadcrumb}></p>
            <h1 className={styles.pageTitle}>Categorías</h1>
            <p className={styles.pageDescription}>
              Administra las categorías que verán los usuarios finales.
            </p>
          </div>

          <Link href="/dashboard" className={styles.backLink}>
            ← Volver al dashboard
          </Link>
        </section>

        {/* Formulario de Nueva/Editar Categoría */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            {editingId ? 'Editar categoría' : 'Nueva categoría'}
          </h2>

          {err && <p className={styles.errorMessage}>{err}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombre</label>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Tecnología"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción</label>
              <input
                className={styles.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Texto breve de la categoría"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Color</label>
              <input
                type="color"
                className={styles.colorInput}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={saving}
                className={styles.submitButton}
              >
                {saving
                  ? editingId
                    ? 'Guardando...'
                    : 'Creando...'
                  : editingId
                  ? 'Guardar cambios'
                  : 'Crear categoría'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className={styles.cancelButton}
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Lista de Categorías */}
        <section className={styles.listSection}>
          <h2 className={styles.sectionTitle}>Categorías existentes</h2>

          {loading ? (
            <p className={styles.loadingText}>Cargando categorías...</p>
          ) : categories.length === 0 ? (
            <p className={styles.emptyText}>
              Aún no hay categorías. Crea la primera arriba 👆
            </p>
          ) : (
            <div className={styles.categoriesGrid}>
              {categories.map((cat) => (
                <div key={cat.id} className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryTitleWrapper}>
                      <span
                        className={styles.colorDot}
                        style={{ backgroundColor: cat.color }}
                      />
                      <h3 className={styles.categoryName}>{cat.name}</h3>
                    </div>
                    <span className={styles.categorySlug}>
                      slug: <code>{cat.slug}</code>
                    </span>
                  </div>

                  {cat.description && (
                    <p className={styles.categoryDescription}>{cat.description}</p>
                  )}

                  <div className={styles.categoryFooter}>
                    <Link
                      href={`/categoria/${cat.slug}`}
                      className={styles.viewLink}
                    >
                      Ver ruta pública →
                    </Link>

                    <div className={styles.categoryActions}>
                      <button
                        type="button"
                        onClick={() => handleEdit(cat)}
                        className={styles.editButton}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id)}
                        className={styles.deleteButton}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}