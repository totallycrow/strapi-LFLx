const https = require('https');
const { NodeHttpHandler } = require('@smithy/node-http-handler');

module.exports = ({ env }) => {
  
  const r2Endpoint = env('R2_ENDPOINT');
  // Remove bucket name from endpoint - it should only be in params.Bucket
  // Endpoint should be: https://<account-id>.r2.cloudflarestorage.com
  let endpoint = r2Endpoint ? r2Endpoint.replace(/\/$/, '') : undefined;
  if (endpoint) {
    try {
      const url = new URL(endpoint);
      // Remove any path components - endpoint should be just the base URL
      url.pathname = '';
      endpoint = url.toString().replace(/\/$/, '');
    } catch (e) {
      // If URL parsing fails, try to remove the bucket path manually
      // Remove everything after the last / that's not part of the domain
      endpoint = endpoint.replace(/\/[^\/]+$/, '');
    }
  }

  // Create a custom request handler with SSL configuration for R2
  // This helps resolve SSL handshake failures with Cloudflare R2
  const requestHandler = new NodeHttpHandler({
    httpsAgent: new https.Agent({
      keepAlive: true,
      maxSockets: 50,
      // Allow all TLS versions (Node.js will negotiate the best one)
      // This helps with R2 compatibility
      rejectUnauthorized: true,
    }),
  });

  return {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          // baseUrl should be the public URL where images are accessible
          // Don't include rootPath here - it's already added to fileKey by the provider
          baseUrl: env('R2_PUBLIC_URL'),
          // rootPath allows organizing files by website/project in the bucket
          // Files will be stored at: bucket/rootPath/filename
          // The provider automatically prepends rootPath to the fileKey
          // Set R2_ROOT_PATH in .env (e.g., "website1", "site2", etc.)
          rootPath: env('R2_ROOT_PATH', ''),
          s3Options: {
            credentials: {
              accessKeyId: env('R2_ACCESS_KEY_ID'),
              secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
            },
            // Use 'us-east-1' for R2 (or 'auto' if that doesn't work)
            region: env('R2_REGION', 'us-east-1'),
            endpoint: endpoint,
            forcePathStyle: true, // Required for R2 (S3-compatible services)
            requestHandler: requestHandler,
            params: {
              ACL: null,
              Bucket: env('R2_BUCKET_NAME'),
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
    'deep-populate': {
      enabled: true,
      config: {
        useCache: true, // default
        replaceWildcard: true, // default
      },
    },
    
  };
};