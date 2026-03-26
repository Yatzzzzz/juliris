import { NextRequest, NextResponse } from "next/server";
import {
    deleteAdminProduct,
    getAdminProductById,
    updateAdminProduct,
} from "@/lib/admin-products";

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const product = await getAdminProductById(params.id);
        if (!product) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ product });
    } catch (err) {
        console.error("GET /api/admin/products/[id]:", err);
        return NextResponse.json({ error: "Failed to fetch product" }, {
            status: 500,
        });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const body = await request.json();
        const product = await updateAdminProduct(params.id, body);
        if (!product) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ product });
    } catch (err) {
        console.error("PUT /api/admin/products/[id]:", err);
        return NextResponse.json({ error: "Failed to update product" }, {
            status: 500,
        });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const ok = await deleteAdminProduct(params.id);
        if (!ok) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE /api/admin/products/[id]:", err);
        return NextResponse.json({ error: "Failed to delete product" }, {
            status: 500,
        });
    }
}
