import type { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/login',
    component: '@/pages/Login',
    layout: false,
  },
  {
    path: '/create',
    component: '@/pages/Create',
    layout: false,
  },
  { path: '/', component: '@/pages/index' },
];

export default routes;
