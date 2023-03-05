import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { APP_ENV } = process.env;

export default defineConfig({
  publicPath: '/',
  base: '/',
  favicons: ['/favicon.ico'],
  outputPath: 'dist',
  title: 'want.chat',
  metas: [
    {
      name: 'keywords',
      content: 'nvwa.chat',
    },
    {
      name: 'description',
      content: 'nvwa.chat',
    },
    { name: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
    { name: 'Expires', content: '0' },
    { name: 'format-detection', content: 'telephone=yes' },
    {
      name: 'viewport',
      content:
        'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,viewport-fit=cover',
    },
  ],
  headScripts: [],
  scripts: [
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-0TVDSDKTKP"></script>',
    `<script>
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-0TVDSDKTKP');
</script>`,
  ],
  routes,
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/moment2dayjs',
  ],
  model: {},
  initialState: {},
  mfsu: false,
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  alias: {},
  history: {
    type: 'browser',
  },
  targets: {
    chrome: 60,
  },
  clientLoader: {},
  // proxy: proxy[APP_ENV || ''],
  hash: true,
  manifest: {
    background: '#f8f8f8',
    safearea: {
      bottom: {
        offset: 'none',
      },
    },
  },
  define: {
    OPENAI_API_KEY: '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',
  },
});
