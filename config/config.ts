import { defineConfig } from 'umi';
import path from 'path';
import routes from '../src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  theme: {
    '@primary-color': '#326DFC',
    '@ant-prefix': 'ant',
  },
  layout: {
    name: 'Algorithm Management System',
    logo: '/logo.png',
    locale: false,
    navTheme: 'light',
    width: '100%',
    layout: 'mix',
  },
  favicon: '/logo.png',
  fastRefresh: {},
  alias: {
    '@root': path.resolve('./'),
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  forkTSChecker: {},
});
