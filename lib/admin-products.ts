/**
 * Admin product CRUD — backed by MySQL (Hostinger).
 *
 * Column mapping: TypeScript camelCase ↔ MySQL snake_case
 * JSON columns (variant_options, tags, categories, gallery_urls) are stored
 * as longtext and serialised/deserialised in this layer.
 */

import pool from "@/lib/db";
import type { AdminProduct } from "@/types/admin";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// ---------------------------------------------------------------------------
// Row ↔ Object mapping helpers
// ---------------------------------------------------------------------------

interface ProductRow extends RowDataPacket {
    id: string;
    slug: string;
    status: "draft" | "published";
    collection_label: string;
    name: string;
    subtitle: string | null;
    show_reviews: number; // tinyint
    review_count: number;
    star_rating: number;
    short_description: string | null;
    regular_price: number;
    sale_price: number | null;
    variant_type: string;
    variant_custom_label: string | null;
    variant_options: string | null; // longtext JSON
    details: string | null;
    how_to_use: string | null;
    ingredients: string | null;
    image_url: string | null;
    image_alt: string | null;
    sku: string | null;
    material: string | null;
    tags: string | null; // longtext JSON
    categories: string | null; // longtext JSON
    gallery_urls: string | null; // longtext JSON
    ijewel_model_id: string | null;
    created_at: Date;
    updated_at: Date;
}

function rowToProduct(row: ProductRow): AdminProduct {
    return {
        id: row.id,
        slug: row.slug,
        status: row.status,
        collectionLabel: row.collection_label ?? "Juliris Collection",
        name: row.name,
        subtitle: row.subtitle ?? "",
        showReviews: Boolean(row.show_reviews),
        reviewCount: row.review_count ?? 0,
        starRating: Number(row.star_rating) ?? 4.5,
        shortDescription: row.short_description ?? "",
        regularPrice: row.regular_price,
        salePrice: row.sale_price,
        variantType: (row.variant_type as AdminProduct["variantType"]) ?? "size",
        variantCustomLabel: row.variant_custom_label ?? "",
        variantOptions: safeJsonArray(row.variant_options),
        sku: row.sku ?? "",
        material: row.material ?? "",
        tags: safeJsonArray(row.tags),
        categories: safeJsonArray(row.categories),
        details: row.details ?? "",
        howToUse: row.how_to_use ?? "",
        ingredients: row.ingredients ?? "",
        imageUrl: row.image_url ?? "",
        imageAlt: row.image_alt ?? "",
        galleryUrls: safeJsonArray(row.gallery_urls),
        ijewelModelId: row.ijewel_model_id ?? "",
        createdAt: row.created_at?.toISOString() ?? new Date().toISOString(),
        updatedAt: row.updated_at?.toISOString() ?? new Date().toISOString(),
    };
}

function safeJsonArray(val: unknown): string[] {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
        try {
            const parsed = JSON.parse(val);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }
    return [];
}

// ---------------------------------------------------------------------------
// CRUD operations
// ---------------------------------------------------------------------------

export async function getAllAdminProducts(): Promise<AdminProduct[]> {
    const [rows] = await pool.query<ProductRow[]>(
        "SELECT * FROM products ORDER BY updated_at DESC",
    );
    return rows.map(rowToProduct);
}

export async function getAdminProductById(
    id: string,
): Promise<AdminProduct | null> {
    const [rows] = await pool.query<ProductRow[]>(
        "SELECT * FROM products WHERE id = ? LIMIT 1",
        [id],
    );
    return rows.length > 0 ? rowToProduct(rows[0]) : null;
}

export async function createAdminProduct(
    input: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">,
): Promise<AdminProduct> {
    const id = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await pool.query<ResultSetHeader>(
        `INSERT INTO products (
            id, slug, status, collection_label, name, subtitle,
            show_reviews, review_count, star_rating, short_description,
            regular_price, sale_price, variant_type, variant_custom_label,
            variant_options, details, how_to_use, ingredients,
            image_url, image_alt, sku, material, tags, categories,
            gallery_urls, ijewel_model_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            input.slug,
            input.status,
            input.collectionLabel,
            input.name,
            input.subtitle,
            input.showReviews ? 1 : 0,
            input.reviewCount,
            input.starRating,
            input.shortDescription,
            input.regularPrice,
            input.salePrice,
            input.variantType,
            input.variantCustomLabel,
            JSON.stringify(input.variantOptions ?? []),
            input.details,
            input.howToUse,
            input.ingredients,
            input.imageUrl,
            input.imageAlt,
            input.sku ?? "",
            input.material ?? "",
            JSON.stringify(input.tags ?? []),
            JSON.stringify(input.categories ?? []),
            JSON.stringify(input.galleryUrls ?? []),
            input.ijewelModelId ?? "",
        ],
    );

    // Fetch the newly created row to get DB-generated timestamps
    const created = await getAdminProductById(id);
    return created!;
}

export async function updateAdminProduct(
    id: string,
    input: Partial<Omit<AdminProduct, "id" | "createdAt">>,
): Promise<AdminProduct | null> {
    // Build dynamic SET clause from provided fields
    const fieldMap: Record<string, unknown> = {};

    if (input.slug !== undefined) fieldMap.slug = input.slug;
    if (input.status !== undefined) fieldMap.status = input.status;
    if (input.collectionLabel !== undefined) fieldMap.collection_label = input.collectionLabel;
    if (input.name !== undefined) fieldMap.name = input.name;
    if (input.subtitle !== undefined) fieldMap.subtitle = input.subtitle;
    if (input.showReviews !== undefined) fieldMap.show_reviews = input.showReviews ? 1 : 0;
    if (input.reviewCount !== undefined) fieldMap.review_count = input.reviewCount;
    if (input.starRating !== undefined) fieldMap.star_rating = input.starRating;
    if (input.shortDescription !== undefined) fieldMap.short_description = input.shortDescription;
    if (input.regularPrice !== undefined) fieldMap.regular_price = input.regularPrice;
    if (input.salePrice !== undefined) fieldMap.sale_price = input.salePrice;
    if (input.variantType !== undefined) fieldMap.variant_type = input.variantType;
    if (input.variantCustomLabel !== undefined) fieldMap.variant_custom_label = input.variantCustomLabel;
    if (input.variantOptions !== undefined) fieldMap.variant_options = JSON.stringify(input.variantOptions);
    if (input.details !== undefined) fieldMap.details = input.details;
    if (input.howToUse !== undefined) fieldMap.how_to_use = input.howToUse;
    if (input.ingredients !== undefined) fieldMap.ingredients = input.ingredients;
    if (input.imageUrl !== undefined) fieldMap.image_url = input.imageUrl;
    if (input.imageAlt !== undefined) fieldMap.image_alt = input.imageAlt;
    if (input.sku !== undefined) fieldMap.sku = input.sku;
    if (input.material !== undefined) fieldMap.material = input.material;
    if (input.tags !== undefined) fieldMap.tags = JSON.stringify(input.tags);
    if (input.categories !== undefined) fieldMap.categories = JSON.stringify(input.categories);
    if (input.galleryUrls !== undefined) fieldMap.gallery_urls = JSON.stringify(input.galleryUrls);
    if (input.ijewelModelId !== undefined) fieldMap.ijewel_model_id = input.ijewelModelId;

    const keys = Object.keys(fieldMap);
    if (keys.length === 0) return getAdminProductById(id);

    const setClauses = keys.map((k) => `\`${k}\` = ?`).join(", ");
    const values = keys.map((k) => fieldMap[k]);

    const [result] = await pool.query<ResultSetHeader>(
        `UPDATE products SET ${setClauses} WHERE id = ?`,
        [...values, id],
    );

    if (result.affectedRows === 0) return null;
    return getAdminProductById(id);
}

export async function deleteAdminProduct(id: string): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
        "DELETE FROM products WHERE id = ?",
        [id],
    );
    return result.affectedRows > 0;
}
