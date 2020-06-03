import Layout from '@/layout'

export const loginRouter = {
  path: '/',
  name: 'login',
  meta: {
    keepAlive: false,
    role: []
  }, 
  component: () => import('@/views/login/login.vue')
}

export const errRouter = [{
  path: '/error-403',
  name: 'error-403',
  meta: {
    keepAlive: false,
    role: []
  },
  component: () => import('@/components/error-page/403.vue')
}, {
  path: '/error-404',
  name: 'error-404',
  meta: {
    keepAlive: false,
    role: []
  },
  component: () => import('@/components/error-page/404.vue')
}, {
  path: '/error-500',
  name: 'error-500',
  meta: {
    keepAlive: false,
    role: []
  },
  component: () => import('@/components/error-page/500.vue')
}, {
  path: '/error-502',
  name: 'error-502',
  meta: {
    keepAlive: false,
    role: []
  },
  component: () => import('@/components/error-page/502.vue')
}, {
  path: '/error-role',
  name: 'error-role',
  meta: {
    keepAlive: false,
    role: []
  },
  component: () => import('@/components/error-page/errorRole.vue')
}]

export const menuRouter = [
  {
    path: '/',
    component: Layout,
    meta: {},
    children: [{
      path: 'home',
      name: 'home',
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
        active: 'home',
        fixed: true
      },
      component: () => import('@/views/00home/home.vue')
    }]
  },
  {
    path: '/workPlatform',
    component: Layout,
    meta: {},
    children: [{
      path: 'index',
      name: 'workPlatform',
      meta: {
        title: '工作台',
        icon: 'icon-atm',
      },
      component: () => import('@/views/workPlatform/workPlatform')
    }]
  },
  {
    path: '/user',
    component: Layout,
    meta: {
      title: '人员管理',
      icon: 'el-icon-s-home',
    },
    children: [{
      path: 'index',
      name: 'user',
      meta: {
        title: '人员管理',
        icon: 'icon-zhanghucaozuo',
      },
      component: () => import('@/views/userManage/user')
    },
    {
      path: 'role',
      name: 'role',
      meta: {
        title: '权限管理',
        icon: 'icon-unlock',
      },
      component: () => import('@/views/userManage/role')
    },
    ]
  },
  {
    path: '/wzp',
    name: 'wzp',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'el-icon-s-home',
    },
    children: [{
        path: 'tableStyle',
        meta: {
          title: '表格样式',
          icon: 'el-icon-tickets',
        },
        name: 'secondSider_index',
        component: () => import('@/views/templates/secondSider.vue'),
        children: [{
            path: 'normal-table',
            name: 'normal-table',
            meta: {
              title: '普通表格',
              icon: 'el-icon-tickets',

            },
            component: () => import('@/components/wzp/wzpTable/normalTable.vue')
          },
          {
            path: 'choosen-table',
            name: 'choosen-table',
            meta: {
              title: '可选表格',
              icon: 'el-icon-tickets',
            },
            component: () => import('@/components/wzp/wzpTable/choosenTable.vue')
          }
        ]
      },
      {
        path: 'formStyle',
        name: 'wzp_index2',
        meta: {
          title: '表单样式',
          icon: 'el-icon-tickets',
        },
        component: () => import('@/views/templates/secondSider.vue'),
        children: [{
            path: 'normal-form',
            name: 'normal-form',
            meta: {
              title: '普通表单',
              icon: 'el-icon-tickets',
            },
            component: () => import('@/components/wzp/wzpForm/formShow.vue')
          },
          {
            path: 'step-form',
            name: 'step-form',
            meta: {
              title: '步骤表单',
              icon: 'el-icon-tickets',
            },
            component: () => import('@/components/wzp/wzpForm/formShow.vue')
          }
        ]
      }
    ],
  },
]

export const routers = [
  loginRouter,
  ...menuRouter,
  ...errRouter
]
