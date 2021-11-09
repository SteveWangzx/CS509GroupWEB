import { defineConfig } from 'umi';
import path from 'path';
import routes from '../src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  history: {
    type: 'hash',
  },
  base: './',
  publicPath: './',
  hash: true,
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
  dynamicImport: {
    loading: '@/components/DynamicImportLoading',
  },
  fastRefresh: {},
  alias: {
    '@root': path.resolve('./'),
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  forkTSChecker: {},
});
