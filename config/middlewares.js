module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // Your specific R2 public URL
            'https://pub-9f79817c7c6242ef9048da14d3843048.r2.dev',
            // Also allow the storage endpoint domain
            'https://*.r2.cloudflarestorage.com',
            // Allow all R2 public domains as fallback
            'https://*.r2.dev',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            'https://pub-9f79817c7c6242ef9048da14d3843048.r2.dev',
            'https://*.r2.cloudflarestorage.com',
            'https://*.r2.dev',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
