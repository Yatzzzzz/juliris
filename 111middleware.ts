import { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    const authHeader = request.headers.get("authorization");

    if (authHeader) {
        const [scheme, encoded] = authHeader.split(" ");
        if (scheme === "Basic" && encoded) {
            const decoded = Buffer.from(encoded, "base64").toString("utf-8");
            const [user, pass] = decoded.split(":");
            if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
                return NextResponse.next();
            }
        }
    }

    // Challenge browser with HTTP Basic Auth popup
    return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Juliris Admin"',
        },
    });
}

export const config = {
    matcher: ["/admin/:path*"],
};
