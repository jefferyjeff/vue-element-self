<style lang="less">
  @import './502.less';
</style>

<template>
  <div class="error502">
    <div class="error502-body-con">
      <Card>
        <div class="error502-body-con-title">5<span>
            <Icon type="ios-navigate-outline"></Icon>
          </span>2</div>
        <p class="error502-body-con-message">The server exploded</p>
        <div class="error502-btn-con">
          <Button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</Button>
          <Button @click="backPage" size="large" style="width: 200px;margin-left: 40px;" type="primary">返回上一页</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Error502',
    methods: {
      backPage() {
        //this.$router.back()
        this.$router.go(-1);
      },
      goHome() {

        this.$router.push({
          //name: 'home_index'
          name: 'login'
        });
      }
    },
    mounted() {
      //console.log(this.$router)
      //console.log(this.$router.history.pending.name)
      //this.backPage();
    },

  };
</script>
