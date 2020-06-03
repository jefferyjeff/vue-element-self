import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const RouterConfig = {
    //mode: 'history',
    routes: routers//添加路由
};
export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from, next) => {

})
