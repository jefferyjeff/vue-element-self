import my from '@/assets/js/my';
import {menuRouter} from '@/router/router'

const state = {
  sidebar: {
    opened : true,
    // withoutAnimation: false
  },
  device: my.web,//设置当前显示设备类型(web, 1366, mobile)
  size: 'medium',
  tagViews: []
}
const mutations = {
  /* 修改siderbar显隐
  */
  SET_SIDERBAR(state) {
    state.sidebar.opened = !state.sidebar.opened
  },
  /* 判断屏幕对应状态
  */
  SET_DEVICE(state, device) {
    if(device === my.smallweb) {
      //若匹配屏幕是 992<= width <=1366
      state.sidebar.opened = false;
    }else if(device === my.web){
      state.sidebar.opened = true;
    }else{
      state.sidebar.opened = false;
    }
    state.device = device;
  },
  /* 关闭siderbar
  */
  CLOSE_SIDERBAR(state) {
    state.sidebar.opened = false;
  },
  /* 添加tag
  */
  ADD_TAGSVIEW(state, tag) {
    //用some判断该tag是否已存在
    if(state.tagViews.some(val=> val.path === tag.path)) return;
    state.tagViews.push(
      Object.assign({}, tag, {
        title: tag.meta.title || 'no-name'
      })
    )
  },
  /* 删除指定tag
  */
  DEL_TAGSVIEW(state, index) {
    state.tagViews.splice(index, 1)
  },
  /* 关闭其他,除了fixed和当前的tag
  */
  CLOSE_OTHERTAGS(state, path) {
    let nowPath = state.tagViews.find(val => path === val.path);
    const tags = state.tagViews.filter(val => val.meta.fixed);//先把fixed路由取出
    state.tagViews = tags;
    let index = tags.findIndex(val=> val.path === path);
    if(index === -1){
      state.tagViews.push(nowPath);
    }
  },
  /* 除了fixed:true, 全部关闭
  */
  CLOSE_ALLTAGS(state) {
    const tags = state.tagViews.filter(val => val.meta.fixed);
    console.log(tags);
    state.tagViews = tags;
  },
}
const actions = {
  /* 修改siderbar显隐
  */
  siderBarCollapse({commit}) {
    commit("SET_SIDERBAR")
  },
  /* 判断屏幕对应状态
  */
  toggleDevice({commit}, device) {
    commit("SET_DEVICE",device)
  },
  /* 关闭siderbar
  */
  closeSiderBar({commit}) {
    commit("CLOSE_SIDERBAR")
  },
  /* 添加tag
  */
  addTagsView({commit}, tag) {
    return new Promise((resolve, reject) => {
      commit("ADD_TAGSVIEW", tag);
      resolve();
    })
  },
  /* 关闭指定tag
  */
  deleteTag({commit}, {tag, nowPath}) {
    return new Promise((resolve, reject) => {
      let index = state.tagViews.findIndex(val=> val.path === tag.path);
      //判断要删除的tag是否是当前路由
      if(tag.path === nowPath){
        resolve(state.tagViews[index-1])
      }else{
        resolve();
      }
      commit("DEL_TAGSVIEW", index)
    })
  },
  /* 关闭其他tags
  */
  closeOtherTags({commit}, path) {
    commit("CLOSE_OTHERTAGS", path);
  },
  /* 全部关闭tag除了fixed:true, 全部关闭
  */
  closeAllTags({commit}) {
    return new Promise((resolve, reject) => {
      commit("CLOSE_ALLTAGS");
      resolve();
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
