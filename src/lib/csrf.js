import crypto from 'crypto';

function getCsrfSecret() {
  if (process.env.CSRF_SECRET) return process.env.CSRF_SECRET;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Fatal: CSRF_SECRET environment variable must be defined in production.');
  }
  return 'dev_csrf_insecure_development_salt';
}

/**
 * Generate a signed Anti-CSRF Token
 */
export function generateCsrfToken() {
  const secret = getCsrfSecret();
  const randomBytes = crypto.randomBytes(24).toString('hex');
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${randomBytes}.${timestamp}`)
    .digest('hex');

  return `${randomBytes}.${timestamp}.${signature}`;
}

/**
 * Validate an Anti-CSRF Token against its cryptographic signature and expiration
 */
export function validateCsrfToken(token, maxAgeMs = 24 * 60 * 60 * 1000) { // 24 hours
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [randomBytes, timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp) || Date.now() - timestamp > maxAgeMs) {
    return false; // Expired
  }

  const secret = getCsrfSecret();
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${randomBytes}.${timestampStr}`)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'utf8'),
    Buffer.from(expectedSignature, 'utf8')
  );
}

/**
 * Extract and verify CSRF token from Request headers & cookies
 */
export function verifyRequestCsrf(request) {
  // Safe read-only HTTP methods do not require CSRF tokens
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  const method = request.method ? request.method.toUpperCase() : 'GET';
  if (safeMethods.includes(method)) {
    return true;
  }

  // 1. Origin / Referer Validation against whitelist if present
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const envOrigins = process.env.ALLOWED_ORIGINS;
  const allowed = envOrigins 
    ? envOrigins.split(',').map(o => o.trim()).filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'];

  if (origin && !allowed.includes(origin)) {
    return false;
  }

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (!allowed.includes(refererOrigin)) {
        return false;
      }
    } catch (e) {
      // Invalid referer URL format
      return false;
    }
  }

  // 2. Double-Submit Cookie & Header Token Verification
  const headerToken = request.headers.get('x-csrf-token') || request.headers.get('X-CSRF-Token');
  let cookieToken = null;
  
  if (request.cookies && typeof request.cookies.get === 'function') {
    cookieToken = request.cookies.get('csrf_token')?.value;
  }

  if (!cookieToken && request.headers.get('cookie')) {
    const rawCookies = request.headers.get('cookie');
    const match = rawCookies.match(/csrf_token=([^;]+)/);
    if (match) {
      cookieToken = decodeURIComponent(match[1]);
    }
  }

  if (!headerToken || !cookieToken) {
    return false;
  }

  if (headerToken !== cookieToken) {
    return false;
  }

  return validateCsrfToken(headerToken);
}

export default {
  generateCsrfToken,
  validateCsrfToken,
  verifyRequestCsrf
};
