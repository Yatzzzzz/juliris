import { NextRequest, NextResponse } from "next/server";
import { createAdminProduct, getAllAdminProducts } from "@/lib/admin-products";

export async function GET() {
    try {
        const products = await getAllAdminProducts();
        return NextResponse.json({ products });
    } catch (err) {
        console.error("GET /api/admin/products:", err);
        return NextResponse.json({ error: "Failed to fetch products" }, {
            status: 500,
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.name?.trim()) {
            return NextResponse.json({ error: "Product name is required" }, {
                status: 400,
            });
        }
        const product = await createAdminProduct(body);
        return NextResponse.json({ product }, {
            status: 201,
        });
    } catch (err) {
        console.error("POST /api/admin/products:", err);
        return NextResponse.json({ error: "Failed to create product" }, {
            status: 500,
        });
    }
}
