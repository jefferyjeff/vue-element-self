<style scoped>
  .main-aside-scrollbar /deep/ .el-scrollbar__view, ul{
    height: 100%;/* 不添加height会是0 */
  }
  .main-aside-scrollbar /deep/ .el-scrollbar__wrap{
    overflow-x:hidden;/* 消除el-scrollbar横向滚动条 */
  }
  .el-menu:not(.el-menu--collapse){/* 控制aside的宽度设置 */
    width: 200px;
    min-height: 100%;
    height: auto;
  }

</style>
<template>
<div class="main-aside">
  <div class="logo" :class="[isCollapse?'logo-smallWidth': '']"><!-- :style="{width: isCollapse?'64px': '200px'}" -->
   <img src="/static/imgs/asideheader.jpg" alt="" v-show="!isCollapse">
    <img src="/static/imgs/asidesmall.jpg" alt="" v-show="isCollapse">
  </div>
  <el-scrollbar class='main-aside-scrollbar'>
    <el-menu class="el-menu"
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#fff"
      :collapse-transition="true"
      mode="vertical"
      menu-trigger="click"
      @select="menuSelect">
      <sider-item ref='siderItem' v-for="(item, index) in perRouter" :key="item.path" :route="item" :basePath="item.path"></sider-item>
    </el-menu>
  </el-scrollbar>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import siderItem from './siderItem';
  import resize from '@/layout/mixin/resize';
  export default {
    props: {

    },
    mixins: [resize],
    components: {
      "sider-item": siderItem
    },
    data() {
      return {
        
      }
    },
    methods: {
      init() {
       
      },
      menuSelect(name) {

        this.$router.push({
          path: name
        })
      }


    },
    mounted() {
      this.init();

    },
    computed: {
      ...mapGetters([
        'sidebar',
        'perRouter'//按权限显示路由
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      activeMenu() {
        return this.$route.path
      }
    },
    watch: {
      //可以监听路由信息
      $route(to, from, next) {
        
      }
    },
    created() {

    },
  }
</script>
