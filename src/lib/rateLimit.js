/**
 * Production-Grade Tiered IP Rate Limiter
 * Provides strict throttling for authentication endpoints to prevent brute-force attacks.
 */

const rateLimitStore = new Map();

// Automatic cleanup every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
      if (now - data.startTime > data.windowMs * 2) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Check IP rate limit for a given bucket/category
 * @param {Request} request Next.js request object
 * @param {number} limit Maximum allowed requests
 * @param {number} windowMs Window duration in milliseconds
 * @param {string} bucket Category identifier (e.g. 'auth', 'general')
 */
export function rateLimit(request, limit = 100, windowMs = 60 * 1000, bucket = 'general') {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');
  const key = `${bucket}:${ip}`;

  const now = Date.now();
  const entry = rateLimitStore.get(key) || { count: 0, startTime: now, windowMs };

  // Reset if time window has elapsed
  if (now - entry.startTime >= windowMs) {
    entry.count = 1;
    entry.startTime = now;
    entry.windowMs = windowMs;
  } else {
    entry.count += 1;
  }

  rateLimitStore.set(key, entry);

  const remaining = Math.max(0, limit - entry.count);
  const isAllowed = entry.count <= limit;
  const resetSeconds = Math.ceil((entry.startTime + windowMs - now) / 1000);

  return {
    success: isAllowed,
    limit,
    remaining,
    resetSeconds: Math.max(0, resetSeconds),
    ip
  };
}

/**
 * Strict rate limiter for authentication & credential routes (10 requests per 15 minutes)
 */
export function authRateLimit(request) {
  const max = parseInt(process.env.RATE_LIMIT_AUTH_MAX, 10) || 10;
  const windowMs = parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS, 10) || 15 * 60 * 1000;
  return rateLimit(request, max, windowMs, 'auth');
}

/**
 * Strict rate limiter for contact form & feedback submissions (5 requests per 10 minutes)
 */
export function contactFormRateLimit(request) {
  return rateLimit(request, 5, 10 * 60 * 1000, 'contact_form');
}

export default {
  rateLimit,
  authRateLimit,
  contactFormRateLimit
};
