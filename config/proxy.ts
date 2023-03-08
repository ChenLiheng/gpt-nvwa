export default {
  dev: {
    '/v1/chat': {
      target: 'http://43.198.72.177:8100',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        // "Cache-Control": "no-cache",
      },
    },
  },
  test: {
    '/v1/chat': {
      target: 'https://43.198.72.177:8100',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        // "Cache-Control": "no-cache",
      },
    },
  },
} as any;
