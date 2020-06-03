<style lang="less">
  @import "~@/assets/less/common.less";
</style>
<style lang="less" scoped></style>
<template>
<div>
  <header-bar ref="headerBar"></header-bar>
  <tag-bar ref="tagBar"></tag-bar>
</div>
</template>

<script>
 
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import headerBar from '@/layout/components/navheader/headerBar';
  import tagBar from '@/layout/components/navheader/tagBar';
  export default {
    props: {

    },
    components: {
      "header-bar": headerBar,
      "tag-bar": tagBar
    },
    data() {
      return {

      }
    },
    methods: {
      init() {

      },
    },
    mounted() {
      this.init();

    },
    computed: {

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
