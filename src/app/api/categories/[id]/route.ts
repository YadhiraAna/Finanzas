import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth-server";
import {
  updateCategory,
  deleteCategory,
  CategoryInput,
} from "@/lib/admin-categories";

type Context = {
  params: {
    id: string;
  };
};

// PUT /api/categories/[id]
export async function PUT(req: NextRequest, context: Context) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = context.params;

  try {
    const body = (await req.json()) as Partial<CategoryInput>;

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
  } catch (error) {
    console.error("Error actualizando categoría:", error);
    return NextResponse.json(
      { error: "Error al actualizar categoría" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id]
export async function DELETE(_req: NextRequest, context: Context) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = context.params;

  try {
    await deleteCategory(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando categoría:", error);
    return NextResponse.json(
      { error: "Error al eliminar categoría" },
      { status: 500 }
    );
  }
}
