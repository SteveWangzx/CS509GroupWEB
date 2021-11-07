import type { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    redirect: '/mainPage',
  },
  { path: '/mainPage', component: '@/pages/MainPage' },
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
];

export default routes;
