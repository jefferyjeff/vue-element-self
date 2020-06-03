<style lang="less">
  .complete{
    .success{
      color: #67C23A;
      font-size: 90px;
    }
    &-word{
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>
<style scoped></style>
<template>
<div class="complete">
  <div style="text-align: center;">
    <i class="iconfont icon-success-fill success" ></i>
    <div class="complete-word">提交成功</div>
  </div>
  <el-row class="mt20" :gutter="15">
    <el-col :span="3" class="common-col-label3">用户名:</el-col>
    <el-col :span="9" style="line-height: 2">{{formData.name}}</el-col>
    <el-col :span="3" class="common-col-label3">年龄:</el-col>
    <el-col :span="8" style="line-height: 2">{{formData.age}}</el-col>
  </el-row>
  <el-row class="mt20" :gutter="15">
    <el-col :span="3" class="common-col-label2">地址:</el-col>
    <el-col :span="20" style="line-height: 2">{{formData.area + formData.address}}</el-col>
  </el-row>
  <el-row class="mt20" :gutter="15">
    <el-col :span="3" class="common-col-label3">电话:</el-col>
    <el-col :span="9" style="line-height: 2">{{formData.phone}}</el-col>
    <el-col :span="3" class="common-col-label3">手机:</el-col>
    <el-col :span="8" style="line-height: 2">{{formData.mobile}}</el-col>
  </el-row>
  <el-row class="mt20" :gutter="15">
    <el-col :span="3" class="common-col-label3">邮箱:</el-col>
    <el-col :span="9" style="line-height: 2">{{formData.email}}</el-col>
    <el-col :span="3" class="common-col-label3">微信:</el-col>
    <el-col :span="8" style="line-height: 2">{{formData.wx}}</el-col>
  </el-row>
  <el-row class="mt20" :gutter="15">
    <el-col :span="3" class="common-col-label3">QQ:</el-col>
    <el-col :span="9" style="line-height: 2">{{formData.qq}}</el-col>
  </el-row>

  <el-row class="mt20" :gutter="15" style='text-align: center;'>
    <el-button type="primary" @click="again">再来一次</el-button>
  </el-row>

</div>

</template>

<script>
  import {
    mapState
  } from 'vuex';
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

      }
    },
    methods: {
      init() {

      },
      again() {
        this.$emit("again");
      }
    },
    mounted() {
      this.init();
      console.log(this.formData)
    },
    computed: {
      ...mapState({
        formData: state => state.form.form,
      }),
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
