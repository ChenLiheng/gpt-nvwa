export default [
  { path: '/', redirect: '/chat' },
  {
    path: '/chat',
    component: 'index',
  },
  {
    path: '/chat/:id',
    component: 'index',
  },
];
