import { defineMiddleware } from "astro:middleware";

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // requests per window

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes to avoid memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) store.delete(key);
  }
}, 5 * 60_000);

function getClientIp(request: Request): string {
  // Cloudflare sets CF-Connecting-IP — use it first.
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ??
    "unknown"
  );
}

function isRateLimited(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  entry.count++;

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { limited: true, retryAfter };
  }

  return { limited: false, retryAfter: 0 };
}

const SECURITY_HEADERS: Record<string, string> = {
  // Prevent MIME-type sniffing
  "X-Content-Type-Options": "nosniff",

  // Disallow embedding in iframes (clickjacking)
  "X-Frame-Options": "DENY",

  // Only send referrer on same-origin requests
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Disable browser features you don't use
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",

  // Content Security Policy
  // - default-src 'self'          → only load resources from your own origin by default
  // - img-src 'self' cdn.jsdelivr.net data: → allow Simple Icons CDN + inline SVGs
  // - style-src 'self' 'unsafe-inline' → DaisyUI injects inline styles at runtime
  // - script-src 'self'           → no third-party scripts
  // - connect-src 'self'          → API calls only to your own origin
  // - frame-ancestors 'none'      → redundant with X-Frame-Options but defense-in-depth
  "Content-Security-Policy": [
    "default-src 'self'",
    "img-src 'self' cdn.jsdelivr.net data:",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join("; "),
};

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  const isApiRoute = url.pathname.startsWith("/api/");

  if (request.method === "OPTIONS" && isApiRoute) {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (isApiRoute) {
    const ip = getClientIp(request);
    const { limited, retryAfter } = isRateLimited(ip);

    if (limited) {
      return new Response(JSON.stringify({ error: "Too Many Requests" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
          ...CORS_HEADERS,
        },
      });
    }
  }

  const response = await next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  if (isApiRoute) {
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      response.headers.set(key, value);
    }
  }

  return response;
});
