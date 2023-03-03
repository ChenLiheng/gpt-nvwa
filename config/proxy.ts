export default {
  dev: {
    '/chat': {
      target: 'http://13.229.45.163:8080/v1/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        // "Cache-Control": "no-cache",
      },
    },
  },
  test: {
    '/chat': {
      target: 'http://13.229.45.163:8080/v1/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      headers: {
        // "Cache-Control": "no-cache",
      },
    },
  },
} as any;
