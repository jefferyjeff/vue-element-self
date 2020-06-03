import Vue from 'vue';

/* 管理权限
 */
const state = {
  form: {}
}
const mutations = {
  SET_FORM(state, form){
    for(let key in form){
      state.form[key] = form[key]
    }
    console.log(state.form)
  },

}
const actions = {
  setForm({commit}, form){
    commit("SET_FORM",form)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
