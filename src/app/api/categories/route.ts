import { NextRequest, NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth-server";
import {
  listCategories,
  createCategory,
  CategoryInput,
} from "@/lib/admin-categories";

// GET /api/categories
export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error listando categorías:", error);
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: 500 }
    );
  }
}

// POST /api/categories
export async function POST(req: NextRequest) {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

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

    const category = await createCategory(input);
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Error creando categoría:", error);
    return NextResponse.json(
      { error: "Error al crear categoría" },
      { status: 500 }
    );
  }
}
