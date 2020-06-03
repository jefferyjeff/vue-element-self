<style lang="less">
  @import "~@/assets/less/common.less";
  @import "./role.less";

</style>
<style scoped></style>
<template>
<div class="role common">
  <el-row :gutter="20">
    <el-col :span="4">
      <role-list ref="roleList"></role-list>
    </el-col>
    <el-col :span="20">
      <role-main ref="roleMain"></role-main>
    </el-col>
  </el-row>


</div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import roleList from '@/components/roles/roleList';
  import roleMain from '@/components/roles/roleMain';
  export default {
    props: {

    },
    components: {
      'role-list': roleList,
      'role-main': roleMain
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
