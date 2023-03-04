export default {
  dev: {
    '/v1/chat': {
      target: 'http://13.229.45.163:8100/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        // "Cache-Control": "no-cache",
      },
    },
  },
  test: {
    '/v1/chat': {
      target: 'http://13.229.45.163:8080',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        // "Cache-Control": "no-cache",
      },
    },
  },
} as any;
