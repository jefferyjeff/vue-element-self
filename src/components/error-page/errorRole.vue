<style lang="less">
  /*@import '../assets/less/common.less';*/
@import "./errorRole.less";
</style>
<template>
  <div class="errorRole">
    <div class="errorRole-body">
      <div class="errorRole-body-title">R<span>
          <Icon type="ios-navigate-outline"></Icon>
        </span>LE?</div>
      <p class="errorRole-body-message">您没有权限访问该页面</p>
      <div class="errorRole-btn">
        <Button @click="goHome" size="large" style="width: 200px;" type="text">返回登录页</Button>
        <Button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  export default {
    components: {

    },
    data() {
      return {

      }
    },
    methods: {
      init() {

      },
      goHome() {
        this.$router.push({
          //name: 'home_index'
          name: 'login'
        });
      },
      backPage() {
        this.$router.go(-1);
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
