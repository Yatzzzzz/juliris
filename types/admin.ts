export type VariantType = "none" | "size" | "color" | "ring_size" | "custom";
export type ProductStatus = "draft" | "published";

export interface AdminProduct {
    id: string;
    slug: string;
    status: ProductStatus;

    // A — Identity
    collectionLabel: string;
    name: string;
    subtitle: string;

    // B — Social Proof
    showReviews: boolean;
    reviewCount: number;
    starRating: number; // 0–5, 0.5 steps

    // C — Description
    shortDescription: string;

    // D — Pricing (stored in agorot/cents)
    regularPrice: number;
    salePrice: number | null; // null = no active sale

    // E — Variants
    variantType: VariantType;
    variantCustomLabel: string; // used when variantType === "custom"
    variantOptions: string[]; // index 0 = default selected

    // F — Product Details
    sku: string;
    material: string;
    tags: string[];
    categories: string[];

    // G — Accordion Content
    details: string;
    howToUse: string; // storefront label: "איך לענוד"
    ingredients: string; // comma-separated or prose

    // H — Images
    imageUrl: string;
    imageAlt: string;
    galleryUrls: string[]; // additional gallery images

    // I — 3D Viewer
    ijewelModelId: string; // iJewel Drive File ID for 3D model

    createdAt: string;
    updatedAt: string;
}

export const DEFAULT_PRODUCT: Omit<
    AdminProduct,
    "id" | "createdAt" | "updatedAt"
> = {
    slug: "",
    status: "draft",
    collectionLabel: "Juliris Collection",
    name: "",
    subtitle: "",
    showReviews: true,
    reviewCount: 0,
    starRating: 4.5,
    shortDescription: "",
    regularPrice: 0,
    salePrice: null,
    variantType: "size",
    variantCustomLabel: "",
    variantOptions: [],
    sku: "",
    material: "",
    tags: [],
    categories: [],
    details: "",
    howToUse: "",
    ingredients: "",
    imageUrl: "",
    imageAlt: "",
    galleryUrls: [],
    ijewelModelId: "",
};

export const VARIANT_TYPE_LABELS: Record<VariantType, string> = {
    none: "None — no variant selector",
    size: "Size",
    color: "Color",
    ring_size: "Ring Size",
    custom: "Custom",
};
