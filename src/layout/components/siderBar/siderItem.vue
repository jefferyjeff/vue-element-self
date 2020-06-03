<style lang="less" scoped></style>
<template>
  <!-- 使用fragment替代div,否则submenu会出现collaspe时文字依然显示 -->
  <fragment>
    <template v-if="oneChild(route)">
      <el-menu-item :index="resolvePath(onlyOne.path)">
        <i :class='[onlyOne.meta.icon, ]' class="iconfont" style="font-size: 22px;" />
        <span slot="title">{{onlyOne.meta.title}}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(route.path)" popper-append-to-body>
      <template slot="title">
        <i :class='route.meta.icon' class="iconfont" style="font-size: 22px;" />
        <span slot="title">{{route.meta.title}}</span>
      </template>
      <!-- 这里basePath要传route的，不是经过转换的onlyOne-->
      <sider-item v-for="child in route.children" :key="child.path" :route="child" class="nest-menu" :basePath="resolvePath(route.path)" />
    </el-submenu>
  </fragment>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import path from 'path';
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    name: "siderItem",
    props: {
      route: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    components: {

    },
    data() {
      return {
        onlyOne: null
      }
    },
    methods: {
      init() {
        //console.log('path',path)
      },
      /* 判断route是否只有一个children
        @params:
          item: 路由
        @return
          boolean:
              true: el-menu-item
              false: el-submenu
      */
      oneChild(item) {
        if(item.children){
          if(item.children.length <= 1 && !item.children[0].children){
            //二级下hi有一个路由 === 单路由
            this.onlyOne = item.children[0];
            return true;
          }else{
            return false;
          }
        }else{
          //不存在child,单路由
          this.onlyOne = item;
          return true;
        }
       
      },
      resolvePath(routePath){
        /* this.basePath和routePath若是相同的话，resolve后不会改变 (/home, /home) resolve=>  /home
          所以submenu的basePath可以这样使用就不会多层再嵌套了
        */
         return path.resolve(this.basePath, routePath)

      }
    },
    mounted() {
      this.init();

    },
    computed: {
      ...mapGetters([

      ]),

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
