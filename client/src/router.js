
import IndexPage from './pages/index.vue'

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/stock/board',
      component: () => import('./pages/stock/board/index.vue')
    },
    {
      path: '/batch/trend',
      component: () => import('./pages/batch/trend/index.vue')
    },
    {
      path: '/batch/report/report001',
      component: () => import('./pages/batch/report/report001.vue')
    },
    {
      path: '/batch/report/report002',
      component: () => import('./pages/batch/report/report002.vue')
    },
    {
      path: '/batch/report/report003',
      component: () => import('./pages/batch/report/report003.vue')
    },
    {
      path: '/batch/report/report004',
      component: () => import('./pages/batch/report/report004.vue')
    },
    {
      path: '/batch/report/report005',
      component: () => import('./pages/batch/report/report005.vue')
    },
    {
      path: '/batch/report/report006',
      component: () => import('./pages/batch/report/report006.vue')
    }
  ]
}