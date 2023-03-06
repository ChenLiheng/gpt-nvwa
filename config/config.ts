import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';

const { APP_ENV } = process.env;

export default defineConfig({
  publicPath: '/',
  base: '/',
  favicons: ['/favicon.ico'],
  outputPath: 'dist',
  title: '免费ChatGPT应用-Want.Chat',
  metas: [
    {
      name: 'keywords',
      content: 'ChatGPT, Chat, AI, AI助理,个人助理,  聊天, 免费\n',
    },
    {
      name: 'description',
      content:
        'Want.Chat是一款基于ChatGPT API 的免费AI助理应用，拥有强大的聊天功能，用户无需注册即可直接快速使用ChatGPT全部功能，帮助用户处理日常琐事，回答各种问题，提供相关信息和建议等。',
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
    'https://www.googletagmanager.com/gtag/js?id=G-0TVDSDKTKP',
    `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-0TVDSDKTKP');`,
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
