<style lang="less">
  @import "~@/assets/less/common.less";
  //@import "";
  .step{
    .card-header{

      //margin: 0 auto;
      //width: 800px;
    }
    .card-content{
      margin: 30px auto;
      width: 600px;
    }
  }
</style>
<style scoped></style>
<template>
<div class="step common">
  <el-card>
    <div class="card-header">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本资料"></el-step>
        <el-step title="详细资料"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="card-content">
      <step-first ref="stepFirst" @next="next" v-show="active===1"></step-first>
      <step-second ref="stepSecond" @previous="previous" @next="next" v-show="active===2"></step-second>
      <step-third ref="stepThird"  @again="again" v-if="active===3" ></step-third>
     <!-- <step-forth ref="stepForth" @next="next" v-show="active===4"></step-forth> -->
    </div>
  </el-card>

</div>
</template>

<script>
  import my from '@/assets/js/my';
  import utils from '@/assets/js/utils';
  import stepFirst from './stepFirst';
  import stepSecond from './stepSecond';
  import stepThird from './stepThird';
  import stepForth from './stepForth';
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
      'step-first': stepFirst,
      'step-second': stepSecond,
      'step-third': stepThird,
      'step-forth': stepForth
    },
    data() {
      return {
        active: 1
      }
    },
    methods: {
      init() {

      },
      next() {
        this.active++;
      },
      previous() {
        this.active--;
      },
      again() {
        this.active = 1;
        this.$refs.stepFirst.resetForm();
        this.$refs.stepSecond.resetForm();
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
