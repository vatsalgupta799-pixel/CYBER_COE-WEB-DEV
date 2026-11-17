/**
 * Security Sanitization & Injection Defense Utility
 * Protects against XSS (Cross-Site Scripting) and NoSQL Operator Injection.
 */

// 1. Contextual HTML Entity Encoding (XSS Defense)
export function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// 2. Strip Malicious XSS Vectors & Inline Handlers
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script> tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:text\/html/gi, '') // Remove data HTML URIs
    .replace(/\bon\w+\s*=/gi, '') // Remove event handlers (onload=, onerror=, onclick=)
    .trim();
}

// 3. NoSQL Injection Neutralizer (Strips Mongo $ and . operators)
export function sanitizeNoSql(payload) {
  if (!payload || typeof payload !== 'object') {
    return typeof payload === 'string' ? sanitizeString(payload) : payload;
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => sanitizeNoSql(item));
  }

  const cleanObject = {};
  for (const key of Object.keys(payload)) {
    // Drop keys starting with $ (e.g. $gt, $where, $ne) or containing dots
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }

    const value = payload[key];
    if (typeof value === 'object' && value !== null) {
      cleanObject[key] = sanitizeNoSql(value);
    } else if (typeof value === 'string') {
      cleanObject[key] = sanitizeString(value);
    } else {
      cleanObject[key] = value;
    }
  }

  return cleanObject;
}

export default {
  escapeHtml,
  sanitizeString,
  sanitizeNoSql
};
