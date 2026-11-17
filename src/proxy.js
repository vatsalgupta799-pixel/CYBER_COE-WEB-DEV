import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

// 1. Strict Whitelist of Trusted Origins (NO Wildcard *)
const parseAllowedOrigins = () => {
  const envOrigins = process.env.ALLOWED_ORIGINS;
  if (envOrigins) {
    return envOrigins.split(',').map(o => o.trim()).filter(Boolean);
  }
  return [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://192.168.245.1:3000',
    'http://192.168.245.1:3001',
    'https://localhost:3000',
    'https://localhost:3001',
    'https://127.0.0.1:3000',
    'https://127.0.0.1:3001',
    'https://192.168.245.1:3000',
    'https://192.168.245.1:3001'
  ];
};

const ALLOWED_ORIGINS = parseAllowedOrigins();

// 2. Comprehensive Security Headers Policy
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 http://localhost:3000 http://localhost:3001 http://192.168.245.1:3000 https://localhost:3000 https://localhost:3001 https://127.0.0.1:3000 https://127.0.0.1:3001 https://192.168.245.1:3000 https://192.168.245.1:3001 ws: wss:",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ')
};

export function proxy(request) {
  const origin = request.headers.get('origin');
  const pathname = request.nextUrl.pathname;
  const method = request.method.toUpperCase();

  // 3. Strict CORS Verification & Preflight Handling
  if (method === 'OPTIONS') {
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new NextResponse(null, { status: 403, statusText: 'Forbidden: CORS Origin Denied' });
    }
    const preflightResponse = new NextResponse(null, { status: 204 });
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      preflightResponse.headers.set('Access-Control-Allow-Origin', origin);
      preflightResponse.headers.set('Access-Control-Allow-Credentials', 'true');
      preflightResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      preflightResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With');
      preflightResponse.headers.set('Access-Control-Max-Age', '86400');
    }
    return preflightResponse;
  }

  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    // Block unauthorized cross-origin API requests
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { message: 'CORS Policy: Cross-Origin Request Blocked' },
        { status: 403 }
      );
    }
  }

  // 4. Global IP Rate Limiting for API routes
  if (pathname.startsWith('/api/')) {
    const limitMax = pathname.startsWith('/api/auth/') ? 30 : 120;
    const limitWindow = pathname.startsWith('/api/auth/') ? 15 * 60 * 1000 : 60 * 1000;
    const bucket = pathname.startsWith('/api/auth/') ? 'api_auth_mw' : 'api_general';

    const limitState = rateLimit(request, limitMax, limitWindow, bucket);
    if (!limitState.success) {
      return NextResponse.json(
        { 
          message: 'Too many requests. Please slow down.',
          retryAfter: limitState.resetSeconds 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(limitState.resetSeconds),
            'X-RateLimit-Limit': String(limitState.limit),
            'X-RateLimit-Remaining': String(limitState.remaining)
          }
        }
      );
    }
  }

  // 5. JWT Token Parsing & RBAC for Admin Routes
  const adminToken = request.cookies.get('admin_token')?.value;

  function decodeJwtPayload(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  const payload = adminToken ? decodeJwtPayload(adminToken) : null;
  const userRole = payload?.role;

  // Protect /admin routes (redirect unauthenticated to /login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!adminToken || (userRole !== 'admin' && userRole !== 'editor')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect /api/admin routes
  if (pathname.startsWith('/api/admin')) {
    if (!adminToken || (userRole !== 'admin' && userRole !== 'editor')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  // 6. Construct Response & Attach Security + CORS Headers
  const response = NextResponse.next();

  // Attach all security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Attach explicit trusted CORS headers
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With');
  }

  return response;
}

export { proxy as middleware };
export default proxy;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
