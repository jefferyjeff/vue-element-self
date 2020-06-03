import Vue from 'vue'

const state = { 
  mainContentHeight: 0//设置router-view区域的main-content的高度
}
const mutations = {
  SET_MAINCONTENTHEIGHT(state, height) {
    state.mainContentHeight = height;
    
  }
}
const actions = {

  setMainContentHeight({commit}, height) {
      commit("SET_MAINCONTENTHEIGHT", height)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
