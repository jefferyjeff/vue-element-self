<style lang="less">
  @import "~@/assets/less/common.less";
  @import "~@/layout/layout.less";
</style>
<style scoped>
  .main-container /deep/ .el-header{
    padding: 0;
  }
  .main-container /deep/ .el-main{
    padding: 10px;
  }
</style>
<template>
<el-container class='main common'>
  <div class="bg-web" v-if="device==='mobile'&&sidebar.opened" @click="closeBgMethod"></div>
  <transition  mode="out-in">

  <el-aside width='none' v-show="device!='mobile'||sidebar.opened" class="el-aside" >
    <sider-bar></sider-bar>
  </el-aside>
  </transition>
  <el-container class='main-container'>
    <el-header class='main-header' style="height: none">
      <nav-header ref="navheader">

      </nav-header>
    </el-header>

    <el-main class='main-content' ref="mainContent">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>

    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import { mapState } from 'vuex';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import siderBar from '@/layout/components/siderBar';
  import navheader from '@/layout/components/navheader';
  import resize from '@/layout/mixin/resize';
  export default {
    name: "Layout",
    props: {

    },
    mixins: [resize],
    components: {
      "sider-bar": siderBar,
      "nav-header": navheader,

    },
    data() {
      return {

      }
    },
    methods: {
      init() {
        this.setMainContentHeight();
      },
      /* 设置mai-content的height,后续表格height布局会用到
      */
      setMainContentHeight() {
        this.$store.dispatch("resize/setMainContentHeight", this.$refs.mainContent.$el.offsetHeight)
      },
      /* 关闭全屏遮罩
      */
      closeBgMethod() {
        this.$store.dispatch("app/closeSiderBar")
      }
    },
    mounted() {
      this.init();

      window.onresize = () => {
        return (() => {
         this.setMainContentHeight();
        })()
      }
    },
    computed: {
      ...mapState({
        device: state => state.app.device,
        sidebar: state => state.app.sidebar
      })
    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {

      }
    },
    created() {
		//权限路由待完成中，这里线埋个桩触发一下
		this.$store.dispatch("permission/validRoutes", []);
    },
  }
</script>
