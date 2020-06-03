import Vue from 'vue';
import { menuRouter } from '@/router/router'
/* 管理权限
 */
const state = {
  count: 0,
  perRouter: [],
  roles: []
}
const mutations = {
  SET_PER_ROUTES(state, routes){
    state.perRouter = menuRouter;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  }
}
const actions = {
  validRoutes({commit}, roles) {
    commit("SET_PER_ROUTES", [])
  },
  /* 赋值权限页面选择的权限roles
  */
  setRoles({commit}, roles){
    commit("SET_ROLES", roles);
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
