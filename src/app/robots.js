export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/projects',
          '/student-resources',
          '/news',
          '/research',
          '/people',
          '/publications'
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/api',
          '/api/*',
          '/login',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/_next/*'
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
