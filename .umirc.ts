import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  theme: {
    '@primary-color': '#29d9b3',
    '@ant-prefix': 'ant',
  },
  layout: {
    name: 'Algorithm Management System',
    logo: 'public/logo.png',
    locale: false,
    navTheme: 'light',
    layout: 'mix',
  },
  fastRefresh: {},
});
