import { NextResponse } from 'next/server';

/**
 * Production-Safe Error Handler
 * Sanitizes errors so internal stack traces, DB connection strings, and system paths
 * are never exposed to clients in production environments.
 */
export function handleApiError(error, customMessage = 'An error occurred while processing your request') {
  const isProd = process.env.NODE_ENV === 'production';

  // Always log full error details on backend server logs for debugging
  console.error('[API Error]:', error);

  const statusCode = error.statusCode || error.status || 500;
  
  const responsePayload = {
    success: false,
    message: isProd ? customMessage : (error.message || customMessage)
  };

  // Only include debug error details in local development mode
  if (!isProd && error.stack) {
    responsePayload.debug = {
      name: error.name,
      message: error.message,
      stack: error.stack.split('\n').slice(0, 4)
    };
  }

  return NextResponse.json(responsePayload, { status: statusCode });
}

export default handleApiError;
