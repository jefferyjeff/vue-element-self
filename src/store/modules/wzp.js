import Vue from 'vue';

/* 所有一般vuex
 */
const state = {
  primaryColumns: [],
}
const mutations = {

  SET_PRIMRYCOLUMNS(state, columns){
    state.primaryColumns = columns;
  }

}
const actions = {
  /* choosenTable第一次请求的columns是完整的,保存下来
  */
  setPrimaryColumns({commit}, columns){
    commit("SET_PRIMRYCOLUMNS", columns)
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
