module.exports = ({ env }) => {
  // Support Railway's DATABASE_URL format
  const databaseUrl = env('DATABASE_URL');
  
  let connection;
  
  if (databaseUrl) {
    // Parse DATABASE_URL (format: postgresql://user:password@host:port/database)
    const url = new URL(databaseUrl);
    connection = {
      host: url.hostname,
      port: parseInt(url.port, 10) || 5432,
      database: url.pathname.slice(1), // Remove leading '/'
      user: url.username,
      password: url.password,
      ssl: {
        rejectUnauthorized: false
      },
    };
  } else {
    // Fall back to individual environment variables
    connection = {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USER', 'strapi'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: {
        rejectUnauthorized: false
      },
    };
  }

  return {
    connection: {
      client: 'postgres',
      connection,
      debug: false,
      pool: { min: 0, max: 7 },
    },
  };
};