<style scoped>
  .role-list /deep/ .el-scrollbar__view, ul{
    height: 100%;/* 不添加height会是0 */
  }
  .role-list /deep/ .el-scrollbar__wrap{
    overflow-x:hidden;/* 消除el-scrollbar横向滚动条 */
  }

</style>
<template>
  <div class="role-list">
    <div class="header">权限列表</div>

    <div class="content">
      <el-scrollbar ref="scrollTag" class="content-scroll">
        <div class="each" v-for="(item, index) in roleList" :key="item.id" @click="roleListClick(item, index)" :class="[activeIndex === index?'active': '']">
          <span>{{item.id+1}}.</span>
          &nbsp;&nbsp;{{item.name}}
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    props: {
      // xxx: {
      //   type: xxx,
      //   default: xxx
      //   default: function() {
      //     console.log("propE default invoked.");
      //     return { message: "I am from propE." };
      //   }
      // }
    },
    components: {

    },
    data() {
      return {
        roleList: [],
        activeIndex: -1
      }
    },
    methods: {
      init() {
        utils.POST({
          url: '/api/getRoleList',
          success: (res) => {
            this.roleList = res.data;
          },
          error: () => {

          },
          finally: () => {

          }
        })
      },
      /* 点击list赋值roles
      */
      roleListClick(item, index) {
        this.activeIndex = index;
        this.$store.dispatch('permission/setRoles', item.roles)
      }
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
