// En: src/app/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth-server";
import {
  updateCategory,
  deleteCategory,
  CategoryInput,
} from "@/lib/admin-categories";

// Definición de tipos de contexto para rutas dinámicas del App Router
interface RouteContext {
  params: { 
    id: string; // El nombre 'id' debe coincidir con el nombre de la carpeta [id]
  };
}

/**
 * Manejador PUT: Actualiza una categoría específica por ID.
 * @param req El objeto de la solicitud (NextRequest o Request estándar).
 * @param context El objeto de contexto que contiene los parámetros de la ruta.
 */
export async function PUT(req: NextRequest, context: RouteContext) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Desestructuración segura del ID
  const id = context.params.id;

  try {
    const body = (await req.json()) as Partial<CategoryInput>;
    
    // Validación obligatoria
    if (!body.name) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 }
      );
    }

    const input: CategoryInput = {
      name: body.name,
      description: body.description ?? "",
      color: body.color ?? "#22c55e",
    };

    const category = await updateCategory(id, input);
    return NextResponse.json({ category });
    
  } catch (e) {
    console.error("Error actualizando categoría:", e);
    return NextResponse.json(
      { error: "Error al actualizar categoría" },
      { status: 500 }
    );
  }
}

/**
 * Manejador DELETE: Elimina una categoría específica por ID.
 * @param _req El objeto de la solicitud (se ignora en DELETE).
 * @param context El objeto de contexto que contiene los parámetros de la ruta.
 */
export async function DELETE(_req: NextRequest, context: RouteContext) { // ✅ Usa NextRequest
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const id = context.params.id;

  try {
    await deleteCategory(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error eliminando categoría:", e);
    return NextResponse.json(
      { error: "Error al eliminar categoría" },
      { status: 500 }
    );
  }
}