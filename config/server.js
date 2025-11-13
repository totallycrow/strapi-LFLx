module.exports = ({ env }) => {
  // Railway requires 0.0.0.0 to listen on all interfaces
  // Convert IPv6 "::" to "0.0.0.0" for compatibility
  let host = env('HOST', '0.0.0.0');
  if (host === '::') {
    host = '0.0.0.0';
  }

  return {
    host,
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
  };
};