<style lang="less">
@import '~@/assets/less/common.less';

/* 页面切换路由动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

<template>
<div style='height: 100%;'>
  <transition name="fade-transform" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import my from '@/assets/js/my'
import utils from '@/assets/js/utils'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  methods: {
    init () {

    }

  },
  mounted () {
    this.init()
  },
  computed: {

  },
  watch: {
    // 可以监听路由信息
    $route (to, from, next) {

    }
  },
  created () {

  }
}
</script>
